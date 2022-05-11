import React from "react";

const NotFound = () => {
    return (
        <>
            <h1 className="display-1 text-center">Ошибка 404</h1>
            <p className="lead">
                Кажется что-то пошло не так! Страница, которую вы запрашиваете, не существует. Возможно
                она устарела, была удалена, или быд введен неверный адрес в адресной строке.
            </p>
            <button>Перейти на главную</button>
        </>
    );
};

export default NotFound;
