import ListItem from "./ListItem"

const List = (props) => {
  const { data } = props;

  return (
    <ul className="c-list">
      {data.map((product) => <ListItem key={product.id} product={product} />)}
    </ul>
  )
};

export default List;