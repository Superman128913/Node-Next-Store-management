import { withMainLayoutPage } from '@/modules/shared/components/layouts/page/Main';

import { Grid } from '@mui/material';
import BlogCard from '@/components/dashboard/BlogCard';
import ProductPerfomance from '@/components/dashboard/ProductPerfomance';
import FullLayout from '@/layouts/full-layout';

const Dashboard = () => {
  return (
    <FullLayout>
      <Grid container spacing={0}>
        <Grid item xs={12} lg={12}>
          <ProductPerfomance />
        </Grid>
        <Grid item xs={12} lg={12}>
          <BlogCard />
        </Grid>
      </Grid>
    </FullLayout>
  );
};

export default withMainLayoutPage(Dashboard, {
  title: 'Dashboard'
});
