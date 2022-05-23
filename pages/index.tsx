import {
    Button,
    Checkbox,
    createStyles,
    IconButton,
    makeStyles,
    Paper,
    Snackbar,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Theme,
    Typography,
} from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import Link from 'next/link';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import GetRows from '../components/pages/GetRows';
import ConfirmationDialog from '../components/screen/ConfirmationDialog';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Home() {
    const rows = GetRows();

    const [deleteOptions, setDeleteOptions] = useState<{
        show: boolean;
        itemId?: number;
        itemDescription?: string;
    }>({ show: false });

    const [messageInfo, setMessageInfo] = useState<{
        show: boolean;
        message: string;
    }>({ show: false, message: '' });

    const handleDelete = (item: any) => {
        setDeleteOptions({
            show: true,
            itemId: item.id,
            itemDescription: item.nome,
        });
    };

    const handleDeleteCallBack = (value: string) => {
        const { itemId } = deleteOptions;
        setDeleteOptions({ show: false, itemId: null, itemDescription: null });

        if (value === 'ok') {
            // deleta
            axios.delete('http://localhost:3030/genericCRUD?id_usuario=1&token=82yflie3czlqfqblbjv97x0a&table=atividades&id='+itemId);
            
            setMessageInfo({
                show: true,
                message: 'Item excluído com sucesso',
            });

            window.location.href = './';
            
        }
    };

    return (
        <div className={styles.container}>
            <main className={styles.main}>
                <TableContainer component={Paper}>
                    <Table aria-label="Atividades">
                        <TableHead>
                            <TableRow>
                                <TableCell>Nome</TableCell>
                                <TableCell>status</TableCell>
                                <TableCell>tipo</TableCell>
                                <TableCell width="140" align="center">
                                    Ações
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (
                                <TableRow key={row.id}>
                                    <TableCell component="th" scope="row">
                                        {row.nome}
                                    </TableCell>
                                    <TableCell>
                                        <Checkbox
                                            readOnly={false}
                                            checked={row.status}
                                        />
                                    </TableCell>
                                    <TableCell>{row.tipo}</TableCell>
                                    <TableCell>
                                        <IconButton
                                            aria-label="delete"
                                            onClick={() => handleDelete(row)}
                                        >
                                            <Delete />
                                        </IconButton>
                                        <Link
                                            href={`/atividades/edit/${row.id}`}
                                            passHref
                                        >
                                            <IconButton aria-label="edit">
                                                <Edit />
                                            </IconButton>
                                        </Link>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <ConfirmationDialog
                    id={`delete-${deleteOptions.itemId}`}
                    title="Excluir"
                    confirmButtonText="Excluir"
                    keepMounted
                    open={deleteOptions.show}
                    onClose={handleDeleteCallBack}
                >
                    Confirma a exclusão do item{' '}
                    <strong>{deleteOptions.itemDescription}</strong>
                </ConfirmationDialog>

                <br />

                <div>
                    <Link href="/atividades/new" passHref>
                        <Button variant="contained" color="primary">
                            Nova atividade
                        </Button>
                    </Link>
                </div>
            </main>

            <footer className={styles.footer}>
                <a
                    href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Powered by{' '}
                    <span className={styles.logo}>
                        <Image
                            src="/vercel.svg"
                            alt="Vercel Logo"
                            width={72}
                            height={16}
                        />
                    </span>
                </a>
            </footer>
        </div>
    );
}
