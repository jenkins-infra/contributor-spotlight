import React from 'react';
import {
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    Typography,
    Box,
    IconButton,
    Stack,
} from '@mui/material';
import {
    GitHub,
    LinkedIn,
    Twitter,
    CalendarMonth,
    Person,
} from '@mui/icons-material';
import { Link as GatsbyLink } from 'gatsby';

const ContributorCard = ({ contributor }) => {
    const pageAttributes = contributor?.node?.pageAttributes ?? {};
    const slug = contributor?.node?.fields?.slug;
    const {
        name,
        image,
        location,
        datepublished,
        github,
        linkedin,
        twitter,
        pronouns,
    } = pageAttributes;

    return (
        <Card
            component='article'
            sx={{ maxWidth: 345, m: 2 }}
            role='article'
            aria-label={`Contributor card for ${name}`}
        >
            <CardActionArea
                component={GatsbyLink}
                to={slug}
                aria-label={`View details for contributor ${name}`}
            >
                <CardMedia
                    component='img'
                    height='180'
                    image={image}
                    alt={
                        name
                            ? `${name}'s profile photo`
                            : 'Contributor profile photo'
                    }
                />
                <CardContent>
                    <Typography gutterBottom variant='h6' component='div'>
                        {name}
                    </Typography>
                    <Typography variant='body2' color='text.secondary'>
                        {location}
                    </Typography>
                    <Stack direction='row' spacing={2} mt={1}>
                        {datepublished && (
                            <Box display='flex' alignItems='center'>
                                <CalendarMonth sx={{ fontSize: 16, mr: 0.5 }} />
                                <Typography variant='caption'>
                                    {datepublished}
                                </Typography>
                            </Box>
                        )}
                        {pronouns && (
                            <Box display='flex' alignItems='center'>
                                <Person sx={{ fontSize: 16, mr: 0.5 }} />
                                <Typography variant='caption'>
                                    {pronouns}
                                </Typography>
                            </Box>
                        )}
                    </Stack>
                </CardContent>
            </CardActionArea>
            <Box sx={{ display: 'flex', justifyContent: 'center', pb: 1 }}>
                {github && (
                    <IconButton
                        component='a'
                        href={`https://github.com/${github}`}
                        target='_blank'
                        rel='noopener'
                        aria-label={`Open GitHub profile for ${name}`}
                    >
                        <GitHub />
                    </IconButton>
                )}
                {linkedin && (
                    <IconButton
                        component='a'
                        href={`https://linkedin.com/in/${linkedin}`}
                        target='_blank'
                        rel='noopener'
                        aria-label={`Open LinkedIn profile for ${name}`}
                    >
                        <LinkedIn />
                    </IconButton>
                )}
                {twitter && (
                    <IconButton
                        component='a'
                        href={`https://twitter.com/${twitter}`}
                        target='_blank'
                        rel='noopener'
                        aria-label={`Open Twitter profile for ${name}`}
                    >
                        <Twitter />
                    </IconButton>
                )}
            </Box>
        </Card>
    );
};

export default ContributorCard;
