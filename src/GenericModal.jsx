import React, { useState } from 'react'
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';


export default function GenericModal({ onSubmit }) {




    const useStyles = makeStyles(theme => ({
        paper: {
            position: 'absolute',
            width: 200,
            backgroundColor: theme.palette.background.paper,
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 3),
        },
    }));

    const classes = useStyles();

    const [isOpen, setIsOpen] = useState(true)
    return (
        <Modal
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            open={isOpen}
            onClose={() => { setIsOpen(false) }}>

            <div className={classes.paper}>

                <Typography>
                    {"Would you like to add News app to Home Screen ?"}
                </Typography>
                <div style={{ marginTop: 12 }}>
                    <Button variant="contained" color="primary"
                        onClick={() => {
                            setIsOpen(false)
                            onSubmit()
                        }}>Add to Home Screen</Button>
                </div>
            </div>

        </Modal>

    )
}
