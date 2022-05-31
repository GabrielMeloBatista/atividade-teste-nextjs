import Slide from '@mui/material/Slide';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { TransitionProps } from '@mui/material/transitions/transition';
import { forwardRef, ReactNode } from 'react';

interface IConfirmationDialogProps {
    id: string;
    title: string;
    children: ReactNode;
    classes?: Record<'paper', string>;
    keepMounted: boolean;
    open: boolean;
    cancelButtonText?: string;
    confirmButtonText?: string;
    onClose: (value?: string) => void;
}

const Transition = forwardRef(function Transition(
    props: TransitionProps & { children: React.ReactElement<any, any> },
    ref: React.Ref<unknown>
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function ConfirmationDialog(props: IConfirmationDialogProps) {
    const {
        children,
        open,
        title,
        cancelButtonText,
        confirmButtonText,
        onClose,
        ...other
    } = props;

    const handleCancel = () => {
        onClose('cancel');
    };

    const handleOk = () => {
        onClose('ok');
    };

    return (
        <Dialog
            disableEscapeKeyDown
            maxWidth="xs"
            aria-labelledby="confirmation-dialog-title"
            open={open}
            TransitionComponent={Transition}
            {...other}
        >
            <DialogTitle id="confirmation-dialog-title">{title}</DialogTitle>
            <DialogContent dividers>{children}</DialogContent>
            <DialogActions>
                <Button autoFocus onClick={handleCancel} color="primary">
                    {cancelButtonText || 'Cancelar'}
                </Button>
                <Button onClick={handleOk} color="primary">
                    {confirmButtonText || 'Ok'}
                </Button>
            </DialogActions>
        </Dialog>
    );
}
