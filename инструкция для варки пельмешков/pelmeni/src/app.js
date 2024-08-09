import styles from './app.module.css';
import data from './data.json';
import { useState } from 'react';

export const App = () => {
	const [steps, setSteps] = useState(data);
	const [activeIndex, setActiveIndex] = useState(0);
	let idOfActivItem = `00${activeIndex + 1}`;

	const goForward = () => {
		setActiveIndex(activeIndex + 1);
	};

	const goBack = () => {
		setActiveIndex(activeIndex - 1);
	};

	const startOver = () => {
		setActiveIndex(0);
	};

	let itIsLastStep = false;
	if (idOfActivItem === '007') {
		itIsLastStep = true;
	}

	let itIsFirstStep = false;
	if (idOfActivItem === '001') {
		itIsFirstStep = true;
	}

	const actualContent = () => {
		let arrayOfActualContent = steps.filter((item) => item.id === idOfActivItem);
		let content = arrayOfActualContent.map((item) => item.content);
		return content;
	};

	const todoActive = (event) => {
		let newActivIndex = event.target.parentNode.id - 1;
		setActiveIndex(newActivIndex);
	};

	const buttonList = () => {
		const listOfButton = steps.map((item) =>
			item.id === idOfActivItem ? (
				<li
					className={
						styles['steps-item'] + ' ' + styles.done + ' ' + styles.active
					}
					key={item.id}
					id={item.id.substring(2, 3)}
				>
					<button className={styles['steps-item-button']} onClick={todoActive}>
						{item.id.substring(2, 3)}
					</button>
					{` Шаг ${item.id.substring(2, 3)}`}
				</li>
			) : (
				<li
					className={styles['steps-item'] + ' ' + styles.done}
					key={item.id}
					id={item.id.substring(2, 3)}
				>
					<button className={styles['steps-item-button']} onClick={todoActive}>
						{item.id.substring(2, 3)}
					</button>{' '}
					{` Шаг ${item.id.substring(2, 3)}`}
				</li>
			),
		);

		return listOfButton;
	};

	return (
		<div className={styles.container}>
			<div className={styles.card}>
				<h1>Инструкция по готовке пельменей</h1>
				<div className={styles.steps}>
					<div className={styles['steps-content']}>{actualContent()}</div>
					<ul className={styles['steps-list']}>{buttonList()}</ul>
					<div className={styles['buttons-container']}>
						<button
							className={styles.button}
							onClick={itIsFirstStep ? null : goBack}
						>
							Назад
						</button>
						<button
							className={styles.button}
							onClick={itIsLastStep ? startOver : goForward}
						>
							{itIsLastStep ? 'Начать сначала' : 'Далее'}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};
