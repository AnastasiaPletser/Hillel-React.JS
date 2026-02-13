import { useMutation, gql } from '@apollo/client';

export const CREATE_PRODUCT = gql`
  mutation CreateProduct($input: ProductInput!) {
    createProduct(input: $input) {
      id
      name
      description
      year
      price
      author
      imgUrl
      # authorId
    }
  }
`;

// export const REMOVE_PRODUCT = gql`
//     mutation removeProduct($id: ID) {
//         removeProduct(id: $id) {
//             id
//         }
//     }
// `;

export const REMOVE_PRODUCT = gql`
  mutation RemoveProduct($id: ID!) {
    removeProduct(id: $id)
  }
`;


export const UPDATE_PRODUCT = gql`
  mutation UpdateProduct($id: ID!, $input: ProductInput!) {
    updateProduct(id: $id, input: $input) {
      id
      name
      description
      price
      year
      author
      imgUrl
      # authorId
    }
  }
`;
export function EditProduct ({ id, editData, onUpdate }) {
  const [updateProduct, { loading, error }] = useMutation(UPDATE_PRODUCT);

  const handleSaveChanges = async () => {
    try {
      await updateProduct({
        variables: {
          id,
          input: editData, 
        },
      });

      await onUpdate();

      } catch (error) {
      console.error("Помилка оновлення:", error.message);
      alert("Не вдалося зберегти зміни. Спробуйте ще раз.");
    }
  };

  return (
    <div>
      <button onClick={handleSaveChanges} disabled={loading}>
        {loading ? "Зберігаємо..." : "Зберегти зміни"}
      </button>
      {error && <p style={{ color: "red" }}> {error.message}</p>}
    </div>
  );
}

// export const MyComponent = () => {
//   const [createProduct] = useMutation(CREATE_PRODUCT);
//   const handleCreate = () => {
//     createProduct({
//       variables: {
//         input: {
//           name: "Назва книги",
//           description: "Опис",
//           price: 100,
//           year: 2025,
//           author: "Автор",
//           imgUrl: ["https://example.com/image.jpg"],
//           authorId: 1
//         }
//       }
//     });
//   };

//   return <button onClick={handleCreate}>Додати товар</button>;
// };
