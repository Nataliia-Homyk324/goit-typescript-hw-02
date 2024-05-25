import { Field, Form, Formik } from 'formik';
import css from './SearchBar.module.css';
import toast, { Toaster } from 'react-hot-toast';

const SearchBar = ({ onSearch }) => {
  const handleSubmit = (values, actions) => {
    if (values.search.trim() === '') {
      toast.error('The search field cannot be empty!');
      return;
    }
    onSearch(values.search.trim().toLowerCase());
    actions.resetForm();
  };

  return (
    <>
      <header className={css.searchHeader}>
        <Formik initialValues={{ search: '' }} onSubmit={handleSubmit}>
          <Form>
            <Field
              className={css.inputSearch}
              type="text"
              name="search"
              autoComplete="off"
              autoFocus
              placeholder="Search images and photos"
            />
            <button className={css.btnSearch} type="submit">
              Search
            </button>
            <Toaster />
          </Form>
        </Formik>
      </header>
    </>
  );
};

export default SearchBar;
