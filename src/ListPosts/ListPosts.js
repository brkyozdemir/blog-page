
import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Paper, AccordionDetails, AccordionSummary, Accordion, AccordionActions, Button } from '@material-ui/core';
import * as api from '../api/index';
import Pagination from '@material-ui/lab/Pagination';
import Skeleton from '@material-ui/lab/Skeleton';
import { useSnackbar } from 'notistack';
import { useResetRecoilState } from 'recoil';
import { userState } from '../States/States';


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
  const [page, setPage] = React.useState(1);
  const [pageLength, setPageLength] = React.useState(0);
  const [loading, setLoading] = React.useState(true)
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  useEffect(() => {
    (async () => {
      const postList = await api.listPosts(undefined, 1);
      console.log(postList)
      setPosts(postList.posts);
      setPageLength(Math.ceil(postList.maxPosts / 7));
      setLoading(false);
    })();
  }, [])

  const handlePageChange = async (event, value) => {
    setLoading(true)
    const response = await api.listPosts(undefined, value)
    console.log(response)
    setPosts(response.posts)
    setPage(value)
    setLoading(false)
  }

  const handleDelete = async (id) => {
    setLoading(true)
    const response = await api.deletePost(id);
    console.log(response);
    response.message === "Deleted successfully!" ? enqueueSnackbar(response.message, { variant: 'success' }) : enqueueSnackbar(response.message, { variant: 'error' });
    const res = await api.listPosts(undefined, page)
    setPosts(res.posts)
    setLoading(false)
  }

  return (
    <>
      {/* <Paper className={classes.root}><Skeleton variant="rect" width={210} height={118} /></Paper> */}
      {
        loading ? <Paper className={classes.root}><Skeleton variant="rect" width={700} height={384} /></Paper>
          :
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
                <AccordionActions>
                  <Button size="small" color="primary">Edit</Button>
                  <Button onClick={() => handleDelete(post._id)} size="small" color="secondary">Delete</Button>
                </AccordionActions>
              </Accordion>
            ))}
            {posts.length > 0 && <Pagination className="paginator" count={pageLength} page={page} onChange={handlePageChange} hideNextButton hidePrevButton />}
          </Paper>
      }
    </>
  );
}


export default ListPosts;