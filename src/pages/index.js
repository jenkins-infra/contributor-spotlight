import React, { useEffect, useState } from 'react';
import '../../styles/index.css';
import { Box, Stack, Typography, useTheme } from '@mui/material';
import { graphql } from 'gatsby';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Helmet } from 'react-helmet';
import dayjs from 'dayjs';
import axios from 'axios';
import Papa from 'papaparse';
import ContributorsList from '../Components/Contributor/ContributorsList.jsx';
import FeaturedContributor from '../Components/Featured-contributor/FeaturedContributor.jsx';
import Search from '../Components/Search/Search.jsx';
const IndexPage = (props) => {
    const theme = useTheme();
    const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const { data } = props;
    const contributors = data.allAsciidoc.edges;
    const [thankYou, setThankYou] = React.useState([]);
    const [darkmode, setDarkmode] = React.useState(null);

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

    useEffect(() => {
        axios
            .get(
                'https://raw.githubusercontent.com/jenkins-infra/jenkins-contribution-stats/main/data/honored_contributor.csv',
                { responseType: 'text' }
            )
            .then((response) => {
                setThankYou(Papa.parse(response.data)?.data[1]);
            });

        const interval = setInterval(() => {
            axios
                .get(
                    'https://raw.githubusercontent.com/jenkins-infra/jenkins-contribution-stats/main/data/honored_contributor.csv',
                    { responseType: 'text' }
                )
                .then((response) => {
                    setThankYou(Papa.parse(response.data)?.data[1]);
                });
        }, 3600000);

        return () => clearInterval(interval);
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
                justifyContent='flex-start'
                padding={isMobile ? 5 : 10}
                sx={{
                    backgroundImage:
                        'url("marek-szturc-2s3fI3M1lO0-unsplash.jpg")',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            >
                <Typography
                    variant={isMobile ? 'h5' : 'h4'}
                    textAlign='center'
                    style={{ color: 'black' }}
                >
                    <strong>Meet the driving forces behind Jenkins</strong>
                    <br />
                    as we showcase the top contributors shaping the future of
                    continuous integration and delivery
                </Typography>
                <Box sx={{ paddingTop: 8 }}>
                    <img src='/jenkins.png' alt='Jenkins logo' />
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
            <Box
                sx={{
                    padding: theme.spacing(5, 0),
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: darkmode ? '#333333' : '#ffffff',
                    color: darkmode ? 'white' : 'black',
                }}
            >
                <Box
                    sx={{
                        padding: isMobile ? theme.spacing(2) : theme.spacing(3),
                        borderRadius: 5,
                        maxWidth: 'fit-content',
                        height: 'fit-content',
                        backgroundColor: 'rgb(218, 209, 198, 0.3)',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        border: darkmode
                            ? '1px solid white'
                            : '1px solid black',
                    }}
                >
                    <Stack
                        direction='row'
                        gap={isMobile ? 1 : 3}
                        justifyItems='center'
                        alignItems='center'
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <img
                                src={thankYou[6]?.replace(/['"]+/g, '')}
                                alt='Random contributor'
                                width={isDesktop ? 100 : isMobile ? 36 : 90}
                                height={
                                    isDesktop ? 100 : isMobile ? '100%' : 90
                                }
                                style={{
                                    marginTop: 'auto',
                                    marginBottom: 'auto',
                                }}
                            />
                        </Box>
                        <Box
                            sx={{
                                fontSize: isMobile ? 'small' : 'medium',
                            }}
                        >
                            Thank you{' '}
                            {thankYou?.filter((item) => item?.trim() === '')
                                .length === 0 && (
                                <a
                                    target='_blank'
                                    rel='noreferrer'
                                    href={thankYou[5]?.replace(/['"]+/g, '')}
                                >
                                    {thankYou[3]?.replace(/['"]+/g, '').trim()
                                        ? thankYou[3]?.replace(/['"]+/g, '')
                                        : thankYou[2]?.replace(/['"]+/g, '')}
                                </a>
                            )}
                            <br />
                            for making {thankYou[7]?.replace(
                                /['"]+/g,
                                ''
                            )} pull{' '}
                            {parseInt(thankYou[7]?.replace(/['"]+/g, '')) >= 2
                                ? 'requests'
                                : 'request'}
                            <br />
                            to{' '}
                            {thankYou[8]?.split(' ')?.length >= 4
                                ? parseInt(thankYou[8]?.split(' ')?.length) +
                                  ' Jenkins '
                                : 'the '}
                            {thankYou[8]?.split(' ').length < 4 &&
                                thankYou[8]
                                    ?.replace(/['"]+/g, '')
                                    .split(/\s+/)
                                    .filter(Boolean)
                                    .map((repo, idx) => (
                                        <>
                                            {thankYou[8]?.split(' ').length >
                                                2 &&
                                                idx ===
                                                    thankYou[8]?.split(' ')
                                                        .length -
                                                        2 &&
                                                'and '}
                                            <a
                                                target='_blank'
                                                rel='noreferrer'
                                                href={`https://github.com/${repo}`}
                                            >
                                                {repo?.split('/')[1]}
                                            </a>
                                            {thankYou[8]?.split(' ').length >=
                                                2 &&
                                            idx <
                                                thankYou[8]?.split(' ').length -
                                                    2 ? (
                                                <>
                                                    ,
                                                    <br />
                                                </>
                                            ) : (
                                                ' '
                                            )}
                                        </>
                                    ))}{' '}
                            {thankYou[8]?.split(' ').length > 2
                                ? 'repos'
                                : 'repo'}{' '}
                            in{' '}
                            {dayjs(
                                thankYou[1]?.replace(/['"]+/g, '').trim()
                            ).format('MMMM YYYY')}
                            !
                        </Box>
                    </Stack>
                </Box>
            </Box>
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
