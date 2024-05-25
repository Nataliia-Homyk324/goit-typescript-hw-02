import { Field, Form, Formik, FormikHelpers, FormikValues } from 'formik';
import css from './SearchBar.module.css';
import toast, { Toaster } from 'react-hot-toast';


type Props = {
  onSearch: (value: string) => void;
}

const SearchBar = ({ onSearch }:Props) => {
  const handleSubmit = (values:FormikValues, actions:FormikHelpers<any>): void => {
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
