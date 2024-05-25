import { useEffect, useState } from 'react';
import Modal from 'react-modal';
import ImageGallery from '../ImageGallery/ImageGallery';
import SearchBar from '../SearchBar/SearchBar';
import { fetchImages } from '../../images-api';
import css from './App.module.css';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import toast, { Toaster } from 'react-hot-toast';
import LoadMoreBtn from '../LoadMoreBtn/LoadMoreBtn';

import ImageModal from '../ImageModal/ImageModal';
import { Image } from './App.types';

 

interface ImageData {
  total_pages: number;
  total: number;
  results: Image[];
}

export default function App() {
  const [images, setImages] = useState<Image[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [query, setQuery] = useState<string>('');

  const [selectedImage, setSelectedImage] = useState<Image | null>(null); // Стан для зберігання вибраного зображення для модального вікна
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false); // Стан для відображення/приховування модального вікна

  useEffect(() => {
    Modal.setAppElement('#root');
  }, []);

  const handleSearch = (newQuery: string) => {
    setQuery(newQuery);
    setPage(1);
    setImages([]); // Reset the Gallery when performing a new search
    setError(false); // Reset error state when performing a new search
  };

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  useEffect(() => {
    if (query === '') {
      return;
    }

    const getImages = async () => {
      try {
        setError(false);
        setIsLoading(true);

        const data: ImageData = await fetchImages(query, page);

        setImages(prevImages => [...prevImages, ...data.results]);

        if (!data.total) {
          toast(
            'Sorry, we have not found the photos.',
            {
              duration: 5000,
            }
          );
        } else if (page < 2) {
          toast.success(`Wow! We found ${data.total} pictures`);
        }
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };

    getImages();
  }, [page, query]);

  const openModal = (image: Image) => {
    setSelectedImage(image);
    setModalIsOpen(true);
  };

  const closeModal = () => setModalIsOpen(false);

  return (
    <div className={css.container}>
      <SearchBar onSearch={handleSearch} />
      <Toaster />
      {error && <ErrorMessage />}
      {images.length > 0 && <ImageGallery items={images} openModal={openModal} />}
      {isLoading && <Loader />}
      {images.length > 9 && !isLoading && <LoadMoreBtn onClick={handleLoadMore} />}
      <ImageModal isOpen={modalIsOpen} image={selectedImage} onCloseModal={closeModal} />
    </div>
  );
}