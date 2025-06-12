import { Box, Flex, Image } from '@chakra-ui/react';
import ConnectWalletButton from '../wallet-custom/connect-wallet-button';
import { landingPageLink, navbarItems } from '../../../constants/home';
import { useTokenStore } from '@/stores/token.store';
import { useEffect, useMemo } from 'react';
import { formatAmount, getNumberFixed, onScrollView } from '@/utils';
import { useWallet } from '@solana/wallet-adapter-react';

const Header = () => {
    const { connected } = useWallet();
    const { solUserAccountInfo } = useTokenStore();

    const totalBalance = useMemo(() => {
        return solUserAccountInfo ? formatAmount(getNumberFixed(solUserAccountInfo?.publicTokensPurchased + solUserAccountInfo?.whitelistTokensPurchased + solUserAccountInfo?.tokenRefEarned || 0, 2)) : '0.00';
    }, [solUserAccountInfo]);

    const handleNavItem = (key?: string | null, link?: string) => {
        if (key) {
            onScrollView(key);
        } else {
            window.open(link, '_blank');
        }
    };

    const onScrollHeader = () => {
        const header = document.getElementById('header');
        if (header) {
            if (window.scrollY > 80) {
                header.classList.remove('header-transparent');
                header.classList.add('header-scrolled');
            } else {
                header.classList.remove('header-scrolled');
                header.classList.add('header-transparent');
            }
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', onScrollHeader);
        return () => window.removeEventListener('scroll', onScrollHeader);
    }, []);

    return (
        <Flex
            id='header'
            position={'fixed'}
            w={'100%'}
            px={'16px'}
            py={'12px'}
            top={0}
            left={0}
            justifyContent={'space-between'}
            alignItems={'center'}
            zIndex={100}
            className='header-transparent'
            md={{
                px: '36px',
                py: '16px',
            }}
            xl={{
                px: '98px',
                py: '24px',
            }}
        >
            <a href={landingPageLink} target='_blank'>
                <Image
                    src='/images/logo.svg'
                    w={'140px'}
                    h={'35px'}
                    display={'none'}
                    md={{
                        display: 'block',
                    }}
                    alt='logo'
                />
                <Image
                    src='/images/logo_only_icon.svg'
                    w={'28px'}
                    h={'35px'}
                    md={{
                        display: 'none',
                    }}
                    alt='logo'
                />
            </a>
            <Flex
                gap={'28px'}
                px={'20px'}
                py={'8px'}
                bg={'var(--navbar-item-bg)'}
                borderRadius={'24px'}
                display={'none'}
                xl={{
                    display: 'flex',
                }}
            >
                {navbarItems?.map((item) => {
                    return (
                        <Box key={item.key} cursor={'pointer'} _hover={{ color: 'var(--select-hover-color)' }} className='!p-2 !font-semibold !leading-[130%]' onClick={() => handleNavItem(item.key, item.link)}>
                            {item.name}
                        </Box>
                    );
                })}
            </Flex>
            <Flex gap={'4px'}>
                {connected && (
                    <Flex gap={'6px'} p={'8px 12px'} bg={'var(--transaction-bg)'} border={'1px solid var(--border-method-normal)'} borderRadius={'4px'} fontSize={'16px'} lineHeight={'20px'} fontWeight={700} cursor={'pointer'} onClick={() => onScrollView('total-balance')}>
                        <Image src='/images/token.svg' w={'20px'} h={'20px'} alt='token' />
                        {totalBalance}
                    </Flex>
                )}
                <ConnectWalletButton />
            </Flex>
        </Flex>
    );
};

export default Header;
