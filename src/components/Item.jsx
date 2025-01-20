import Button from "./Button";
import Input from "./Input";

const Item = (props) => {
  const { item, onDelete, onCheck, onEdit } = props;

  const handleDeleteTodo = () => {
    onDelete(item.id);
  };

  const handleCheckTodo = () => {
    onCheck(item.id);
  };

  const handleEditTodo = () => {
    onEdit(item);
  };

  return (
    <div className="item">
      <Input
        type="checkbox"
        onChange={handleCheckTodo}
        checked={item.checked}
      />
      <h3>{item.title}</h3>

      <div>
        <Button text="Delete" onClick={handleDeleteTodo} />
        <Button text="Edit" onClick={handleEditTodo} />
      </div>
    </div>
  );
};

export default Item;
