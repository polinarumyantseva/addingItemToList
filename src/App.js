import { useState } from 'react';
import styles from './app.module.css';

export const App = () => {
	const [value, setValue] = useState();
	const [list, setList] = useState([]);
	const [error, setError] = useState('');
	const [isValueVaild, setIsValueValid] = useState(false);

	const onInputButtonClick = () => {
		const promptValue = prompt('Введите значение').trim();

		const errorMessage = promptValue.length < 3 ? 'Введенное значение должно содержать минимум 3 символа' : '';
		setError(errorMessage);

		setIsValueValid(promptValue.length >= 3);
		setValue(promptValue);
	};

	const onAddButtonClick = () => {
		if (value >= 3) {
			setList((prevList) => [...prevList, { id: Date.now(), value: value, createDate: new Date() }]);

			setError('');
			setValue('');
			setIsValueValid(false);
		}
	};

	return (
		<div className={styles.app}>
			<h1 className={styles['page-heading']}>Ввод значения</h1>
			<p className={styles['no-margin-text']}>
				Текущее значение <code>value</code>: "<output className={styles['current-value']}>{value}</output>"
			</p>
			{error !== '' && <div className={styles.error}>{error}</div>}
			<div className={styles['buttons-container']}>
				<button onClick={onInputButtonClick} className={styles.button}>
					Ввести новое
				</button>
				<button className={styles.button} onClick={onAddButtonClick} disabled={!isValueVaild}>
					Добавить в список
				</button>
			</div>
			<div className={styles['list-container']}>
				<h2 className={styles['list-heading']}>Список:</h2>
				{list.length > 0 ? (
					<ul className={styles.list}>
						{list.map((item) => {
							return (
								<li key={item.id} className={styles['list-item']}>
									{item.value}
									<span className={styles['list-item-date']}>
										{item.createDate.toLocaleString('ru')}
									</span>
								</li>
							);
						})}
					</ul>
				) : (
					<p className={styles['no-margin-text']}>Нет добавленных элементов</p>
				)}
			</div>
		</div>
	);
};
