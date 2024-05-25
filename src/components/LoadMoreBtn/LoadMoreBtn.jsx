import css from './LoadMoreBtn.module.css';

const LoadMoreBtn = ({ onClick }) => {
  return (
    <div className={css.btnThumb}>
      <button className={css.btnLoad} onClick={onClick}>
        Load More
      </button>
    </div>
  );
};

export default LoadMoreBtn;
