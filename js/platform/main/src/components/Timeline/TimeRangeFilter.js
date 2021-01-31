import React, { Component } from 'react';
import { Grid as MuiGrid, withStyles, Typography, Link as MuiLink } from '@material-ui/core';

const Grid = withStyles({
    root: {
        margin: '0 5px',
    },
})(MuiGrid);

const Link = withStyles(theme => ({
    root: {
        color: theme.palette.gray40.main,
        '&:hover': {
            textDecoration: 'none',
            color: theme.palette.primary.main,
        },
    },
}))(MuiLink);

export default class TimeRangeFilter extends Component {
    handleDateRangeChange(dateRange) {
        if (this.props.handleDateRangeChange && typeof this.props.handleDateRangeChange === 'function') {
            return this.props.handleDateRangeChange(dateRange);
        }
        console.log('selected date range >>> ', dateRange);
    }
    render() {
        const dateFilters = ['1D', '1M', '3M', '6M', '9M', '1Y', '2Y', 'MAX'];
        return (
            <Grid container style={{ justifyContent: 'flex-end' }}>
                <Grid item>
                    <Typography style={{ fontWeight: 'bold' }}>Range:</Typography>
                </Grid>
                {dateFilters.map(dateFilter => (
                    <Grid item>
                        <Link href="#" onClick={() => this.handleDateRangeChange(dateRange)}>
                            {dateFilter}
                        </Link>
                    </Grid>
                ))}
            </Grid>
        );
    }
}