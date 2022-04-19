import {
    Box,
    Button,
    Checkbox,
    createStyles,
    IconButton,
    makeStyles,
    Paper,
    TextField,
    Theme,
    Typography,
} from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { useFormik } from 'formik';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { getAtividadeById } from '../GetRows'; //Criar getAtividadeById no GetTables
import FormLoadingComponent from '../../screen/FormLoading';
import axios from 'axios';
import { boolean } from 'yup/lib/locale';
import { redirect } from 'next/dist/server/api-utils';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        toolbar: {
            display: 'flex',
            alignItems: 'center',
        },
        form: {
            marginTop: theme.spacing(3),
            padding: theme.spacing(3),
        },
        submit: {
            marginTop: theme.spacing(2),
        },
    })
);

interface IFormData {
    nome?: string;
    status?: boolean;
    tipo?: string;
}

export default function AtividadeEdit() {
    const classes = useStyles();
    const [title, setTitle] = useState('Nova Atividade');
    const router = useRouter();
    const { id } = router.query;

    const initialValues: IFormData = {
        nome: '',
        status: false,
        tipo: '',
    };

    const formSchema = Yup.object().shape({
        nome: Yup.string()
            .required('Obrigatório')
            .min(2, 'O nome deve ter pelo menos 2 caracteres'),
        status: Yup.boolean(),
        tipo: Yup.string(),
    });

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: formSchema,
        onSubmit: (values) => {
            // setTimeout(() => {
            //     alert(JSON.stringify(values, null, 2));
            //     formik.setSubmitting(false);
            // }, 3000);
            axios
                .put(
                    'http://localhost:3030/genericCRUD?id_usuario=1&token=82yflie3czlqfqblbjv97x0a&table=atividades&id=' +
                        id,
                    values
                )
                .then(function (response) {
                    console.log(response);
                    formik.setSubmitting(false);
                    window.location.href = '../../';
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
    });

    useEffect(() => {
        if (id) {
            getAtividadeById(Number(id)).then((row) => {
                setTitle(`Editando o cliente: ${row.nome}`);
                formik.setValues({
                    nome: row.nome,
                    status: row.status,
                    tipo: row.tipo,
                });
            });
        }
    },[]);

    return (
        <>
            <div className={classes.toolbar}>
                <Link href="/" passHref>
                    <IconButton aria-label="Voltar">
                        <ArrowBackIcon />
                    </IconButton>
                </Link>
                <Typography component="h1" variant="h4">
                    {title}
                </Typography>
            </div>

            <Box sx={{ display: 'flex' }}>
                <Paper className={classes.form} elevation={3}>
                    <form noValidate onSubmit={formik.handleSubmit}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            id="nome"
                            label="Nome"
                            name="nome"
                            autoComplete="nome"
                            autoFocus
                            onChange={formik.handleChange}
                            value={formik.values.nome}
                            error={
                                formik.touched.nome &&
                                Boolean(formik.errors.nome)
                            }
                            helperText={
                                formik.touched.nome && formik.errors.nome
                            }
                        />
                        <Typography>Status</Typography>
                        <Checkbox
                            checked={formik.values.status}
                            value={formik.values.status}
                            id="status"
                            name="status"
                            onChange={formik.handleChange}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            id="tipo"
                            label="Tipo"
                            name="tipo"
                            autoComplete="tipo"
                            onChange={formik.handleChange}
                            value={formik.values.tipo}
                            error={
                                formik.touched.tipo &&
                                Boolean(formik.errors.tipo)
                            }
                            helperText={
                                formik.touched.tipo && formik.errors.tipo
                            }
                        />

                        <Button
                            className={classes.submit}
                            type="submit"
                            size="large"
                            variant="contained"
                            color="primary"
                            disabled={formik.isSubmitting}
                        >
                            Salvar
                        </Button>
                        {formik.isSubmitting && <FormLoadingComponent />}
                    </form>
                </Paper>
            </Box>
        </>
    );
}
