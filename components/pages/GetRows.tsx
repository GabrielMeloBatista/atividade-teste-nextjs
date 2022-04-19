import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { resolve } from 'node:path/win32';

export default function GetRows() {
    const [rows, setrows] = useState([]);

    // // Utilização mais simples de busca axios
    useEffect(() => {
        axios
            .get(
                'http://localhost:3030/genericCRUD?id_usuario=1&token=82yflie3czlqfqblbjv97x0a&table=atividades'
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
        resolve((await axios.get('http://localhost:3030/genericCRUD?id_usuario=1&token=82yflie3czlqfqblbjv97x0a&table=atividades&id=' + id)).data.body.rows[0]);
    });
};
