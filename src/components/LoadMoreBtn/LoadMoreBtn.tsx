import css from './LoadMoreBtn.module.css';

type Props = {
  onClick: () => void;
  
};

const LoadMoreBtn = ({ onClick }:Props) => {
  return (
    <div className={css.btnThumb}>
      <button className={css.btnLoad} onClick={onClick}>
        Load More
      </button>
    </div>
  );
};

export default LoadMoreBtn;
