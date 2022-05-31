import axios from 'axios';
import { useEffect, useState } from 'react';

export default function GetRows() {
    const [rows, setrows] = useState([]);

    // // Utilização mais simples de busca axios
    useEffect(() => {
        axios
            .get(
                'http://localhost:3030/genericCRUD?id_usuario=1&token=780rblxcnqozvg66tzq972p5q&table=atividades'
            )
            .then((response) => setrows(response.data.body.rows))
            .catch((err) => {
                console.error('ops! ocorreu um erro' + err);
            });
    }, []);
    return rows;
}

export const getAtividadeById = (
    id: number
): Promise<{ id: number; nome: string; status: boolean; tipo: string }> => {
    //Assicrona, pois se utiliza o await
    return new Promise(async (resolve) => {
        //await e para espeerar por uma Promise, neste caso, esperando dados selecionados do banco de dados
        resolve((await axios.get('http://localhost:3030/genericCRUD?id_usuario=1&token=780rblxcnqozvg66tzq972p5q&table=atividades&id=' + id)).data.body.rows[0]);
    });
};
