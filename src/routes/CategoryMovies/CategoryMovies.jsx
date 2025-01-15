import { useParams } from "react-router-dom";

const CategoryMovies = () => {
const categoria = useParams();
console.log(categoria);
    return <div>{categoria.nome}</div>;
};

export default CategoryMovies;
