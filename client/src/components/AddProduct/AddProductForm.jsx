import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_PRODUCT } from '../graphql/mutations';

const AddProductForm = () => {
  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
    year: '',
    imgUrl: [''], 
    author: String,
    authorId: ''
  });

  const [createProduct, { data, loading, error }] = useMutation(CREATE_PRODUCT);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('imgUrl')) {
      const index = parseInt(name.split('-')[1]);
      const newImgUrls = [...form.imgUrl];
      newImgUrls[index] = value;
      setForm({ ...form, imgUrl: newImgUrls });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const addImageField = () => {
    setForm({ ...form, imgUrl: [...form.imgUrl, ''] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const preparedInput = {
      ...form,
      price: parseFloat(form.price),
      year: parseInt(form.year),
      authorId: parseInt(form.authorId),
    
    };
    await createProduct({ variables: { input: preparedInput } });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" placeholder="Name" onChange={handleChange} required />
      <input name="description" placeholder="Description" onChange={handleChange} />
      <input name="price" placeholder="Price" type="number" onChange={handleChange} />
      <input name="year" placeholder="Year" type="number" onChange={handleChange} />
      <input name="author" placeholder="Author" type="string" onChange={handleChange} />
      
      {form.imgUrl.map((url, i) => (
        <input
          key={i}
          name={`imgUrl-${i}`}
          placeholder={`Image URL ${i + 1}`}
          value={url}
          onChange={handleChange}
        />
      ))}
      <button type="button" onClick={addImageField}>Add Image</button>
      <button type="submit">Create Product</button>

      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {data && <p>Product Created: {data.createProduct.name}</p>}
    </form>
  );
};

export default AddProductForm;
