import { FiSearch } from 'react-icons/fi';
import { nanoid } from 'nanoid';
import style from './Form.module.css';

const Form = ({ onSubmit, withId = false }) => {
  const handleSubmit = evt => {
    evt.preventDefault();
    const form = evt.target;
    const searchValue = form.elements.search.value.trim();
    if (!searchValue) return;

    if (withId) {
      onSubmit({
        id: nanoid(),
        text: searchValue,
      });
    } else {
      onSubmit(searchValue);
    }
    form.reset();
  };
  return (
    <form className={style.form} onSubmit={handleSubmit}>
      <button className={style.button} type="submit">
        <FiSearch size="16px" />
      </button>
      <input
        className={style.input}
        placeholder="What do you want to write?"
        name="search"
        required
        autoFocus
      />
    </form>
  );
};

export default Form;
