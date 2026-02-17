import { Box, Stack, useTheme } from '@mui/material';
import React, { useEffect, useState } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import axios from 'axios';
import Papa from 'papaparse';
import dayjs from 'dayjs';

const CommunityStats = ({ darkmode }) => {
    const theme = useTheme();
    const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [thankYou, setThankYou] = useState([]);

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

    if (!thankYou || thankYou.length === 0) return null;

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
                                    <>
                                        {thankYou[8]?.split(' ').length > 2 &&
                                            idx ===
                                                thankYou[8]?.split(' ').length -
                                                    2 &&
                                            'and '}
                                        <a
                                            target='_blank'
                                            rel='noreferrer'
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
    );
};
export default CommunityStats;
