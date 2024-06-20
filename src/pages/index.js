import React, { useEffect } from 'react';
import '../../styles/index.css';
import { Box, Stack, Typography, useTheme } from '@mui/material';
import { graphql, Link } from 'gatsby';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Helmet } from 'react-helmet';
import dayjs from 'dayjs';
import axios from 'axios';
import Papa from 'papaparse';

const IndexPage = (props) => {
    const theme = useTheme();
    const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));
    const isTablet = useMediaQuery(theme.breakpoints.between('lg', 'sm'));
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const { data } = props;
    const contributors = data.allAsciidoc.edges;
    const contributorCards = contributors.map((contributor, idx) => {
        if (contributor.node.pageAttributes.featured === 'false') {
            return (
                <Link
                    to={contributor.node.fields.slug}
                    style={{ textDecoration: 'none', color: '#000000' }}
                    key={idx}
                >
                    <Box padding={isDesktop ? 5 : 2} key={idx}>
                        <Box>
                            <img
                                src={contributor.node.pageAttributes.image}
                                alt='Contributor avatar'
                                width={250}
                                height={250}
                                style={{
                                    objectFit: 'cover',
                                    borderRadius: '50%',
                                }}
                            />
                        </Box>
                        <Box
                            padding={3}
                            display='flex'
                            flexDirection='column'
                            alignItems='center'
                        >
                            <Typography variant='h6' textAlign='center'>
                                {contributor.node.pageAttributes.name}
                            </Typography>
                            <Typography variant='body2' textAlign='center'>
                                {contributor.node.pageAttributes.pronouns}
                            </Typography>
                            <Typography variant='body1' textAlign='center'>
                                {contributor.node.pageAttributes.location}
                            </Typography>
                        </Box>
                    </Box>
                </Link>
            );
        }
    });

    const [thankYou, setThankYou] = React.useState([]);

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

    return (
        <main>
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
                <Typography variant={isMobile ? 'h5' : 'h4'} textAlign='center'>
                    <strong>Meet the driving forces behind Jenkins</strong>
                    <br />
                    as we showcase the top contributors shaping the future of
                    continuous integration and delivery
                </Typography>
                <Box sx={{ paddingTop: 8 }}>
                    <img src='jenkins.png' alt='Jenkins logo' />
                </Box>
            </Box>
            <Box
                display='flex'
                flexDirection='column'
                alignItems='center'
                justifyContent='flex-start'
                paddingTop={5}
                paddingBottom={10}
                paddingLeft={isMobile ? 5 : 10}
                paddingRight={isMobile ? 5 : 10}
            >
                <Box
                    sx={{
                        paddingTop: 5,
                        paddingBottom: 5,
                    }}
                >
                    <Typography variant='h5' textAlign='center'>
                        <strong>Contributor Spotlight</strong>
                    </Typography>
                </Box>
                {contributors.map((contributor, idx) => {
                    if (contributor.node.pageAttributes.featured === 'true') {
                        return (
                            <Link
                                to={contributor.node.fields.slug}
                                style={{
                                    textDecoration: 'none',
                                    color: '#000000',
                                }}
                                key={idx}
                            >
                                <Stack
                                    id='featured-contributor'
                                    direction={isDesktop ? 'row' : 'column'}
                                    minWidth={
                                        isDesktop ? 1100 : isTablet ? 520 : 328
                                    }
                                    height='auto'
                                    padding={isMobile ? 2 : 5}
                                    sx={{
                                        borderRadius: 5,
                                        backgroundImage:
                                            'linear-gradient(180deg, #FFFFFF, #DAD1C6);',
                                    }}
                                    justifyContent='flex-start'
                                    alignItems='center'
                                    useFlexGap
                                    gap={2}
                                >
                                    <Stack
                                        id='featured-contributor-avatar'
                                        direction='column'
                                        justifyContent='center'
                                        alignItems='center'
                                        paddingTop={isMobile ? 0 : 5}
                                        paddingBottom={isMobile ? 0 : 5}
                                        paddingLeft={2}
                                        paddingRight={2}
                                    >
                                        <img
                                            src={
                                                contributor.node.pageAttributes
                                                    .image
                                            }
                                            alt='Featured contributor avatar'
                                            width={
                                                isDesktop
                                                    ? 350
                                                    : isTablet
                                                      ? 300
                                                      : 250
                                            }
                                            height={
                                                isDesktop
                                                    ? 350
                                                    : isTablet
                                                      ? 300
                                                      : 250
                                            }
                                            style={{
                                                objectFit: 'cover',
                                                borderRadius: '50%',
                                            }}
                                        />
                                    </Stack>
                                    <Stack
                                        id='featured-contributor-info'
                                        direction='column'
                                        justifyContent='center'
                                        alignItems='flex-start'
                                        padding={isMobile ? 3 : 5}
                                    >
                                        <Box
                                            marginTop={1}
                                            marginBottom={1}
                                            display='flex'
                                            flexDirection='column'
                                            width='100%'
                                        >
                                            <Typography
                                                variant='h4'
                                                textAlign={
                                                    isDesktop
                                                        ? 'left'
                                                        : 'center'
                                                }
                                            >
                                                {
                                                    contributor.node
                                                        .pageAttributes.name
                                                }
                                            </Typography>
                                            <Typography
                                                variant='h5'
                                                textAlign={
                                                    isDesktop
                                                        ? 'left'
                                                        : 'center'
                                                }
                                            >
                                                {
                                                    contributor.node
                                                        .pageAttributes.pronouns
                                                }
                                            </Typography>
                                        </Box>

                                        <Box
                                            marginTop={1}
                                            marginBottom={1}
                                            display='flex'
                                            flexDirection='column'
                                            width='100%'
                                        >
                                            <Typography
                                                variant='h5'
                                                textAlign={
                                                    isDesktop
                                                        ? 'left'
                                                        : 'center'
                                                }
                                            >
                                                {
                                                    contributor.node
                                                        .pageAttributes.location
                                                }
                                            </Typography>
                                            <Typography
                                                variant='h5'
                                                textAlign={
                                                    isDesktop
                                                        ? 'left'
                                                        : 'center'
                                                }
                                            >
                                                First Commit:{' '}
                                                {
                                                    contributor.node
                                                        .pageAttributes
                                                        .firstcommit
                                                }
                                            </Typography>
                                        </Box>

                                        <Box
                                            marginTop={1}
                                            marginBottom={1}
                                            display='flex'
                                            flexDirection='column'
                                            width='100%'
                                        >
                                            <Typography
                                                variant='h5'
                                                textAlign={
                                                    isDesktop
                                                        ? 'left'
                                                        : 'center'
                                                }
                                            >
                                                Date Published: <br />
                                                {
                                                    contributor.node
                                                        .pageAttributes
                                                        .datepublished
                                                }
                                            </Typography>
                                        </Box>

                                        <Box marginTop={1} marginBottom={1}>
                                            <Typography
                                                sx={{
                                                    display: '-webkit-box',
                                                    maxWidth: '450px',
                                                    WebkitLineClamp: 5,
                                                    WebkitBoxOrient: 'vertical',
                                                    overflow: 'hidden',
                                                }}
                                            >
                                                {
                                                    contributor.node
                                                        .pageAttributes.intro
                                                }
                                            </Typography>
                                        </Box>
                                    </Stack>
                                </Stack>
                            </Link>
                        );
                    }
                })}
                <Box
                    id='contributor-grid'
                    display='grid'
                    gridTemplateColumns={
                        isDesktop
                            ? 'repeat(3, 1fr)'
                            : isMobile
                              ? 'repeat(1, 1fr)'
                              : 'repeat(2, 1fr)'
                    }
                    paddingTop={5}
                    paddingBottom={5}
                >
                    {contributorCards}
                </Box>
            </Box>
            <Box
                sx={{
                    padding: theme.spacing(5, 0),
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Box
                    sx={{
                        padding: theme.spacing(3),
                        borderRadius: 5,
                        maxWidth: 'fit-content',
                        height: 'fit-content',
                        backgroundColor: 'rgb(218, 209, 198, 0.3)',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <Stack
                        direction='row'
                        gap={3}
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
                                alt='Random contributor image'
                                width={isDesktop ? 100 : isMobile ? 50 : 90}
                                height={isDesktop ? 100 : isMobile ? 50 : 90}
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
                            {thankYou.filter((item) => item?.trim() === '')
                                .length === 0 && (
                                <a
                                    target='_blank'
                                    href={thankYou[5]?.replace(/['"]+/g, '')}
                                >
                                    {thankYou[3] === true
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
                            to the{' '}
                            {thankYou[8]
                                ?.replace(/['"]+/g, '')
                                .split(/\s+/)
                                .filter(Boolean)
                                .map((repo, idx) => (
                                    <>
                                        {thankYou[8].split(' ').length >= 2 &&
                                            idx ===
                                                thankYou[8].split(' ').length -
                                                    2 &&
                                            'and '}
                                        <a
                                            target='_blank'
                                            href={`https://github.com/${repo}`}
                                        >
                                            {repo.split('/')[1]}
                                        </a>
                                        {thankYou[8].split(' ').length >= 2 &&
                                        idx <
                                            thankYou[8].split(' ').length -
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
                            {thankYou[8]?.split(' ').length >= 2
                                ? 'repos!'
                                : 'repo!'}
                        </Box>
                    </Stack>
                </Box>
            </Box>
        </main>
    );
};

export default IndexPage;

export const pageQuery = graphql`
    query {
        allAsciidoc(limit: 30) {
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
