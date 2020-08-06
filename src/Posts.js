import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import clsx from 'clsx';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import * as api from './api/index';
import { useSnackbar } from 'notistack';

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(1, 3),
        width: "500px",
        margin: "0 auto"
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: "100%",
        margin: "15px 0"
    },
    span: {
        margin: theme.spacing(1),
        color: "#3f51b5",
        fontWeight: 600,
        border: "1px solid #3f51b5",
        padding: "6px",
        borderRadius: "4px"
    },
    button: {
        margin: theme.spacing(1),
    },
    control: {
        color: "salmon",
        fontSize: "10px",
        width: "100%",
        position: "absolute"
    }
}));


const Posts = () => {
    const classes = useStyles();
    const [values, setValues] = React.useState({
        title: '',
        content: ''
    });
    const [imgPreview, setImgPreview] = React.useState({
        preview: null,
        raw: null
    });
    const [titleControl, setTitleControl] = React.useState(false)
    const [contentControl, setContentControl] = React.useState(false)
    const uploadButton = React.useRef(null);
    const [image, setImage] = React.useState()
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    const handleChangee = name => event => {
        setValues({ ...values, [name]: event.target.value });
    };

    const sendPost = async () => {
        values.content === '' ? setContentControl(true) : setContentControl(false);
        values.title === '' ? setTitleControl(true) : setTitleControl(false)
        if (values.title !== '' && values.content !== '') {
            let data = new FormData();
            data.append('title', values.title);
            data.append('content', values.content);
            data.append('image', image);
            data.append('creator', null);
            const response = await api.sendPost(data)
            console.log(response)
            response.message === "Post added successfully!" ? enqueueSnackbar(response.message, { variant: 'success' }) : enqueueSnackbar(response.message, { variant: 'error' });
            setValues({
                title: "",
                content: ""
            })
            setImgPreview({
                preview: null,
                raw: null
            })
        }
    }

    const handleUpload = (e) => {
        uploadButton.current.click()
    }

    const changeInputHandler = (e) => {
        e.target.files.length && setImgPreview({
            preview: URL.createObjectURL(e.target.files[0]),
            raw: e.target.files[0]
        })

        setImage(e.target.files[0])
    }

    return (
        <Paper className={classes.root}>
            <form className="post-form">
                <TextField
                    id="standard-name"
                    label="Title"
                    className={classes.textField}
                    value={values.title}
                    onChange={handleChangee('title')}
                    margin="normal"
                />
                {titleControl ? <span className={classes.control}>{"Title field is required"}</span> : ""}<br />
                <Button onClick={() => handleUpload()} variant="outlined" color="secondary" className={classes.button}>
                    Upload
                </Button>
                {imgPreview.preview !== null ? <img src={imgPreview.preview} alt="upload-img" style={{ width: "100%" }} /> : ""}
                <input
                    ref={uploadButton}
                    style={{ display: "none" }}
                    type="file"
                    onChange={changeInputHandler} />
                <TextField
                    multiline
                    rows={4}
                    id="standard-name"
                    label="Content"
                    className={classes.textField}
                    value={values.content}
                    onChange={handleChangee('content')}
                    margin="normal"
                />
                {contentControl ? <span className={classes.control}>{"Content field is required"}</span> : ""}<br />
                <Button onClick={() => sendPost()} style={{ width: "100%" }} variant="outlined" color="secondary" className={classes.button}>
                    Send
                </Button>
            </form>
        </Paper>
    )
}

export default Posts;
