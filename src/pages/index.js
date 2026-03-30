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
                flexDirection={isMobile ? 'column' : 'row'}
                alignItems='center'
                justifyContent='center'
                padding={isMobile ? 4 : 6}
                sx={{
                    backgroundColor: '#1f2a3a',
                    borderRadius: '15px',

                    width: '95%',
                    margin: '40px auto',
                }}
            >
                <Box display='flex' justifyContent='center' sx={{ flex: 0.5 }}>
                    <Box
                        component='img'
                        src='/jenkins.png'
                        alt='Jenkins logo'
                        sx={{
                            width: { xs: '100px', sm: '120px', md: '200px' },
                        }}
                    />
                </Box>

                <Box
                    textAlign={isMobile ? 'center' : 'right'}
                    sx={{ flex: 1.2 }}
                >
                    <Typography
                        sx={{
                            fontSize: {
                                xs: '0.90rem',
                                sm: '1.2rem',
                                md: '2.8rem',
                            },
                            color: '#ff4d4f',
                            fontWeight: '700',
                            lineHeight: 1.1,

                            marginBottom: '-4px',
                        }}
                    >
                        Meet the driving forces behind Jenkins
                    </Typography>

                    <Typography
                        sx={{
                            fontSize: {
                                xs: '0.80rem',
                                sm: '1rem',
                                md: '1.8rem',
                            },
                            color: '#d1d5db',
                            lineHeight: 1.1,
                        }}
                    >
                        as we showcase the top contributors shaping the future
                        of continuous integration and delivery
                    </Typography>
                </Box>
            </Box>

            <div
                style={{
                    textAlign: 'center',
                    fontSize: '35px',
                    fontWeight: 'bolder',
                    background: 'transparent',
                    padding: '20px',
                }}
            >
                Contributor Spotlight
            </div>
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
