import React, { useEffect, useState } from 'react';
import '../../styles/index.css';
import { Box, Typography, useTheme } from '@mui/material';
import { graphql } from 'gatsby';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Helmet } from 'react-helmet';
import dayjs from 'dayjs';
import ThankYouNote from '../Components/ThankYouNote.jsx';
import ContributorsList from '../Components/Contributor/ContributorsList.jsx';
import FeaturedContributor from '../Components/Featured-contributor/FeaturedContributor.jsx';
import Search from '../Components/Search/Search.jsx';

const IndexPage = (props) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const { data } = props;
    const contributors = data.allAsciidoc.edges;
    const [darkmode, setDarkmode] = useState(null);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const mediaquery =
                window.matchMedia &&
                window.matchMedia('(prefers-color-scheme: dark)');
            setDarkmode(mediaquery.matches);
            const handler = (event) => {
                setDarkmode(event.matches);
            };
            mediaquery.addEventListener('change', handler);
            return () => {
                mediaquery.removeEventListener('change', handler);
            };
        }
    }, []);

    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const featuredContributor = contributors.find(
        (contributor) => contributor.node.pageAttributes.featured === 'true'
    );
    if (!mounted) {
        return null;
    }

    return (
        <>
            <Helmet>
                <meta charSet='utf-8' />
                <title>Jenkins Contributor Spotlight</title>
                <meta
                    name='title'
                    property='og:title'
                    content='Jenkins Contributor Spotlight'
                />
                <meta property='og:image' content='../../../opengraph.png' />
                <meta property='og:image:width' content='520' />
                <meta property='og:image:height' content='270' />
                <meta
                    property='og:description'
                    content='Jenkins Contributor Spotlight is where we celebrate the contributions of Jenkins community members.
                    We showcase the top contributors shaping the future of continuous integration and delivery.'
                />
                <meta
                    property='article:author'
                    content='Jenkins Copy Editors'
                />
                <meta
                    property='article:published_time'
                    content={dayjs('2023-11-29T00:00:00.000Z').toISOString()}
                />
            </Helmet>
            <Box
                display='flex'
                flexDirection='column'
                alignItems='center'
                justifyContent='center'
                padding={isMobile ? 5 : 10}
                sx={{
                    minHeight: '50vh',
                    backgroundImage:
                        'linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url("marek-szturc-2s3fI3M1lO0-unsplash.jpg")',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            >
                <Typography
                    variant={isMobile ? 'h6' : 'h4'}
                    textAlign='center'
                    style={{ color: 'white' }}
                    sx={{
                        maxWidth: '800px',
                        lineHeight: 1.2,
                        padding: '10px',
                        textShadow: '0px 2px 10px rgba(0,0,0,0.5)',
                    }}
                >
                    <strong>Meet the driving forces behind Jenkins</strong>
                    <br />
                    as we showcase the top contributors shaping the future of
                    continuous integration and delivery
                </Typography>
                <Box sx={{ paddingTop: 8 }}>
                    <img
                        src='/jenkins.png'
                        alt='Jenkins logo'
                        style={{
                            width: '150px',
                            marginTop: '10px',
                        }}
                    />
                </Box>
            </Box>

            <Typography
                variant='h3'
                textAlign='center'
                sx={{ fontWeight: 'bold', marginTop: 6, marginBottom: 3 }}
            >
                Contributor Spotlight
            </Typography>
            <Search contributors={contributors} darkmode={darkmode} />
            <FeaturedContributor
                contributor={featuredContributor}
                darkmode={darkmode}
            />
            <ContributorsList contributors={contributors} darkmode={darkmode} />
            <ThankYouNote darkmode={darkmode} />
        </>
    );
};

export default IndexPage;

export const pageQuery = graphql`
    query {
        allAsciidoc(limit: 1000, sort: { fields: { publicationDate: DESC } }) {
            edges {
                node {
                    id
                    html
                    document {
                        title
                        main
                    }
                    fields {
                        slug
                    }
                    pageAttributes {
                        datepublished
                        name
                        pronouns
                        location
                        firstcommit
                        linkedin
                        twitter
                        github
                        email
                        image
                        featured
                        intro
                    }
                }
            }
        }
    }
`;
