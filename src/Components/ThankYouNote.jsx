import { Box, Stack, useTheme } from '@mui/material';
import React, { useEffect, useState } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import axios from 'axios';
import axiosRetry from 'axios-retry';
import Papa from 'papaparse';
import dayjs from 'dayjs';

// Configure axios-retry for automatic retry with exponential backoff
axiosRetry(axios, {
    retries: 3,
    retryDelay: axiosRetry.exponentialDelay,
    retryCondition: (error) =>
        axiosRetry.isNetworkOrIdempotentRequestError(error),
});

const ThankYouNote = ({ darkmode }) => {
    const theme = useTheme();
    const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [thankYou, setThankYou] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const abortController = new AbortController();
        let isMounted = true;

        const fetchHonoredContributor = async () => {
            try {
                const response = await axios.get(
                    'https://raw.githubusercontent.com/jenkins-infra/jenkins-contribution-stats/main/data/honored_contributor.csv',
                    {
                        responseType: 'text',
                        timeout: 5000,
                        signal: abortController.signal,
                    }
                );

                // Only update state if component is still mounted
                if (!isMounted) return;

                const parsedData = Papa.parse(response.data)?.data[1];
                if (!parsedData || parsedData.length === 0) {
                    setError('Failed to parse contributor data');
                    return;
                }

                setThankYou(parsedData);
                setError(null);
            } catch (error) {
                // Only update state if component is still mounted
                if (!isMounted) return;

                // Don't log abort errors
                if (error.name !== 'CanceledError') {
                    console.error('Error fetching thank you note:', error);
                    setError(
                        'Unable to load contributor recognition at this time'
                    );
                }
            }
        };

        fetchHonoredContributor();
        const interval = setInterval(fetchHonoredContributor, 3600000);

        return () => {
            isMounted = false;
            abortController.abort();
            clearInterval(interval);
        };
    }, []);

    if (!thankYou || thankYou.length === 0) {
        // Show error message if fetch failed
        if (error) {
            return (
                <Box
                    sx={{
                        padding: theme.spacing(5, 0),
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: darkmode ? '#333333' : '#ffffff',
                    }}
                >
                    <Box
                        sx={{
                            padding: theme.spacing(2, 3),
                            borderRadius: 2,
                            backgroundColor: darkmode
                                ? 'rgba(255, 0, 0, 0.1)'
                                : 'rgba(255, 0, 0, 0.05)',
                            border: `1px solid ${
                                darkmode
                                    ? 'rgba(255, 0, 0, 0.3)'
                                    : 'rgba(255, 0, 0, 0.2)'
                            }`,
                            textAlign: 'center',
                            fontSize: 'small',
                            color: darkmode ? '#ffcccc' : '#cc0000',
                        }}
                    >
                        {error}
                    </Box>
                </Box>
            );
        }
        return null;
    }

    return (
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
                    border: darkmode ? '1px solid white' : '1px solid black',
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
                            height={isDesktop ? 100 : isMobile ? '100%' : 90}
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
                                    <React.Fragment key={idx}>
                                        {thankYou[8]?.split(' ').length > 2 &&
                                            idx ===
                                                thankYou[8]?.split(' ').length -
                                                    2 &&
                                            'and '}
                                        <a
                                            target='_blank'
                                            rel='noopener noreferrer'
                                            href={`https://github.com/${repo}`}
                                        >
                                            {repo?.split('/')[1]}
                                        </a>
                                        {thankYou[8]?.split(' ').length >= 2 &&
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
                                    </React.Fragment>
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
    );
};

export default ThankYouNote;
