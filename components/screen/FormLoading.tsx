import {
  Box, CircularProgress, Theme
} from '@mui/material';
import {
  createStyles,
  makeStyles
} from '@mui/styles';
  
  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      loading: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: theme.spacing(1, 0),
      },
      loadingProgress: {
        marginRight: theme.spacing(1),
      },
    })
);

export default function FormLoadingComponent() {
    return (
        <Box>
            <CircularProgress disableShrink color="secondary" size={20} />{' '}
            Aguarde...
        </Box>
    );
}
