export const Button = ({btn_style, btn_text, onClick}) => {
	return (
		<button onClick={onClick} className={`${btn_style}`}>
			{btn_text}
		</button>
	);
};
