
import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Paper, AccordionDetails, AccordionSummary, Accordion } from '@material-ui/core';
import * as api from '../api/index';
import { useSnackbar } from 'notistack';

const useStyles = makeStyles(theme => ({
    root: {
        width: '700px',
        margin: '0 auto',
        padding: '8px 24px'
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: '100%',
        flexShrink: 0,
    },
}));

const ListPosts = () => {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);
    const [posts, setPosts] = React.useState();

    const handleChange = panel => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    useEffect(() => {
        (async () => {
            const postList = await api.listPosts();
            setPosts(postList.posts);
        })();

    }, [])

    return (
        <Paper id="paper" className={classes.root}>
            {posts && posts.map(post => (
                <Accordion key={post._id} expanded={expanded === `panel${post._id}`} onChange={handleChange(`panel${post._id}`)}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1bh-content"
                        id="panel1bh-header">
                        <Typography className={classes.heading}>{post.title}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        {post.imagePath && <img src={post.imagePath} alt="post-img" className="post-image" />}
                        <span style={{ display: "block" }}>{post.content}</span>
                    </AccordionDetails>
                </Accordion>
            ))}
        </Paper>
    );
}


export default ListPosts;