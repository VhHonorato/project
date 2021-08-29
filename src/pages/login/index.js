import React, { useState } from 'react'
import './style.css'
import {Card, Typography, TextField, Button, Backdrop, CircularProgress, Snackbar} from '@material-ui/core';
import {Alert} from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';
import {useForm} from 'react-hook-form';
import {useHistory, Link} from 'react-router-dom'
// import Cadastro from '../Cadastro';

const useStyles = makeStyles((theme) => ({
    card: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        borderRadius:16,
        boxShadow: "0px 8px 9px -5px rgba(0, 0, 0, 0.2), 0px 15px 22px 2px rgba(0, 0, 0, 0.14), 0px 6px 28px 5px rgba(0, 0, 0, 0.12)", 
        padding:"80px 73px 89px 74px",
        "& h2":{
            marginBottom: 88,
        } 
    },
    row:{
        display: "flex",
        flexDirection: "column",
        marginBottom: 40,

    },
    label:{ 
        marginBottom: 48
    },
    button:{ 
        marginLeft: "auto",
        marginRight: "auto",
        "& hover":{
             backgroundColor: "250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 250ms"
        }
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
      }
}));

function Login() {

    const classes = useStyles();
    const history = useHistory();
    const {handleSubmit, register, formState: { errors }, setError} = useForm();
    const [carregando, setCarregando] = useState(false);
    const [erroCarregamento, setErroCarregamento] = useState('');

    async function login(dados){
        if (!dados.senha || !dados.email) {
            setError('senha', {type: "validate"}, {shouldFocus: true});
            setError('email', {type: "validate"}, {shouldFocus: false});
            return;
        }

        setErroCarregamento('');
        setCarregando(true);

        const resposta = await fetch('https://desafio-m03.herokuapp.com/login',{
            method: 'POST',
            body: JSON.stringify(dados),
            headers: {
                'Content-Type': 'application/json',
            }
        });
        setCarregando(false);

        const dataApi = await resposta.json();
        if(!resposta.ok){
            let erro = new Error(dataApi);
            erro.status = 400;
            setErroCarregamento(dataApi);
            return;
            
        }
        
        history.push('/produtos');
    
       
    }



    return(
       <form className="container" onSubmit={handleSubmit(login)}>
           <Card className={classes.card}>
               <Typography variant = "h4" component="h2">Acessar a Conta</Typography>
               <div className={classes.row}>
                   <TextField 
                   className= {classes.label} label="E-mail"
                   {...register('email', {required: true})}
                   error = {!!errors.email}
                   />
                   <TextField 
                   className= {classes.label} label="Senha"
                   type="password"
                   {...register('senha', {required: true})}
                   error = {!!errors.senha}
                   />
               </div>
                <Button type="submit" className={classes.button} variant="contained" color="primary">
                    Entrar
                </Button>
                {carregando && <Backdrop className={classes.backdrop} open={carregando} >
                    <CircularProgress color="inherit" />
                </Backdrop>}
                {erroCarregamento && <Snackbar open={erroCarregamento} autoHideDuration={1000}  >
                    <Alert  severity="error">
                        {erroCarregamento}
                    </Alert>
                </Snackbar>}
                <p>Primeira vez aqui? <Link to={'../Cadastro'}>Crie um conta.</Link> </p>
            </Card>
        </form>

    );

}

export default Login;