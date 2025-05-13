import style from './Button.module.css';

const Button = ({ children, incrementPage }) => {
  return (
    <button className={style.button} onClick={incrementPage}>
      {children}
    </button>
  );
};
export default Button;
