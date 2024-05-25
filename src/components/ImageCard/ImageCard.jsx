import css from './ImageCard.module.css';

export default function ImageCard({ openImage, imageItem }) {
  return (
    <div className={css.galleryThumb}>
      <img
        className={css.galleryImage}
        src={imageItem.urls.small}
        alt={imageItem.alt_description}
        width="360"
        onClick={() => openImage(imageItem)}
      />
      <div className={css.thumbBlock}>
        <p className={css.textPhoto}>
          <strong>Author</strong>
          <br />
          <a
            href={imageItem.user.social.portfolio_url}
            target="_blank"
            rel="noopener noreferrer"
          >
            {imageItem.name}
          </a>
        </p>
        <p className={css.textPhoto}>
          <strong>Likes: </strong>
          {imageItem.likes}
        </p>
      </div>
    </div>
  );
}
