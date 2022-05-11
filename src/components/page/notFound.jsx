import React from "react";
import pictures from "../../statics/images/images.png";
import { useHistory } from "react-router-dom";

const NotFound = () => {
    document.body.style.backgroundImage = `url(${pictures})`;

    const history = useHistory();

    const handleSave = () => {
        history.push(`/`);
    };
    return (
        <>
            <div className="container mt-5">
                <div>
                    <div className="mb-4">
                        <h1 className="display-1 text-center ">Ошибка 404</h1>
                    </div>
                    <div className="mb-4">
                        <p className="lead text-center">
                            Кажется что-то пошло не так! Страница, которую вы запрашиваете, не существует. Возможно
                            она устарела, была удалена, или быд введен неверный адрес в адресной строке.
                        </p>
                    </div>
                    <div className="d-flex justify-content-center">
                        <button
                            className="btn btn-primary w-50"
                            onClick={() => handleSave()}
                        >
                            Перейти на главную
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default NotFound;
