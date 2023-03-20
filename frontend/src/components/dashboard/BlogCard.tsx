import React from 'react';
import { Card, CardContent, Typography, Button, Grid } from '@mui/material';
import Image, { StaticImageData } from 'next/image';
import user1 from '#/images/backgrounds/u2.jpg';
import user2 from '#/images/backgrounds/u3.jpg';
import user3 from '#/images/backgrounds/u4.jpg';

const blogs: {
  img: StaticImageData;
  title: string;
  subtitle: string;
  btncolor: 'error' | 'warning' | 'primary' | 'inherit' | 'secondary' | 'success' | 'info';
}[] = [
  {
    img: user1,
    title: 'Super awesome, Angular 12 is coming soon!',
    subtitle:
      'Some quick example text to build on the card title and make up the bulk of the card\'s content.',
    btncolor: 'error'
  },
  {
    img: user2,
    title: 'Super awesome, Angular 12 is coming soon!',
    subtitle:
      'Some quick example text to build on the card title and make up the bulk of the card\'s content.',
    btncolor: 'warning'
  },
  {
    img: user3,
    title: 'Super awesome, Angular 12 is coming soon!',
    subtitle:
      'Some quick example text to build on the card title and make up the bulk of the card\'s content.',
    btncolor: 'primary'
  }
];

const BlogCard = () => {
  return (
    <Grid container>
      {blogs.map((blog, index) => (
        <Grid
          key={index}
          item
          xs={12}
          lg={4}
          sx={{
            display: 'flex',
            alignItems: 'stretch'
          }}
        >
          <Card
            sx={{
              p: 0,
              width: '100%'
            }}
          >
            <Image src={blog.img} alt="img" layout="intrinsic" />
            <CardContent
              sx={{
                paddingLeft: '30px',
                paddingRight: '30px'
              }}
            >
              <Typography
                sx={{
                  fontSize: 'h4.fontSize',
                  fontWeight: '500'
                }}
              >
                {blog.title}
              </Typography>
              <Typography
                color="textSecondary"
                sx={{
                  fontSize: '14px',
                  fontWeight: '400',
                  mt: 1
                }}
              >
                {blog.subtitle}
              </Typography>
              <Button
                variant="contained"
                color={blog.btncolor}
                sx={{
                  mt: '15px'
                }}
              >
                Learn More
              </Button>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default BlogCard;
