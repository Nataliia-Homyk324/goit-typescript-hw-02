
import ImageCard from '../ImageCard/ImageCard';
import css from './ImageGallery.module.css';
import { Image } from '../App/App.types';

type Props = {
  items: Image[];
  openModal: (image: Image) => void;
}

export default function ImageGallery({ items, openModal }: Props) {
  return (
    <section className={css.containerGallery}>
      <ul className={css.gallery}>
        {items.map(item => (
          <li className={css.galleryItem} key={item.id}>
            <ImageCard imageItem={item} openImage={openModal} />
          </li>
        ))}
      </ul>
    </section>
  );
}
