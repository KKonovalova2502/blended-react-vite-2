import { useEffect, useState } from 'react';
import { getPhotos } from '../apiService/photos';
import Button from '../components/Button/Button';
import Form from '../components/Form/Form';
import Loader from '../components/Loader/Loader';
import PhotosGallery from '../components/PhotosGallery/PhotosGallery';
import Text from '../components/Text/Text';

const Photos = () => {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const getQuery = async inputValue => {
    setQuery(inputValue);
    setPage(1);
    setImages([]);
  };

  const incrementPage = () => {
    setPage(page + 1);
  };

  useEffect(() => {
    if (query === '') {
      return;
    }

    async function fetchData() {
      try {
        setError(false);
        setIsLoading(true);
        const data = await getPhotos(query, page);

        setImages(prev => [...prev, ...data.photos]);
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, [query, page]);

  const hasImages = images.length > 0;
  return (
    <>
      <Form onSubmit={getQuery} />
      {error && <Text textAlign="center">Oooops!.. Try again!</Text>}
      {hasImages && <PhotosGallery images={images} />}
      {isLoading && <Loader />}
      {hasImages && !isLoading && (
        <Button incrementPage={incrementPage}>Load more</Button>
      )}
    </>
  );
};

export default Photos;
