'use client';
import Image from 'next/image';
import React, { useState } from 'react';
import BackIcon from '../../public/back.svg'
import Perfil from '../../public/perfil_img.jpg'
import Menu from '../../public/menu.svg'
import Close from '../../public/close.svg'
import Options from '../../public/options.svg'
import Plus from '../../public/plus.svg'
import Logout from '../../public/logout.svg'
import { Button, ConfigProvider, Form, Input, Modal } from 'antd';
import { AudioOutlined } from '@ant-design/icons';

const { Search } = Input;
const { TextArea } = Input;


const Sidebar = () => {
    const [openSidebar, setOpenSidebar] = useState(false);
    const [openChannels, setOpenChannels] = useState(true);
    const [openOptions, setOpenOptions] = useState(false);
    const [open, setOpen] = useState(false);

    const showModal = () => {
        setOpen(true);
    };
    const hideModal = () => {
        setOpen(false);
    };

    const handleSidebar = () => {
        setOpenSidebar(!openSidebar);
    }

    const handleChannels = () => {
        setOpenChannels(!openChannels);
    }

    const handleOptions = () => {
        setOpenOptions(!openOptions);
    }

    const channel = [
        {
            id: 1,
            name: 'Welcome Channel',
            description: 'This is the welcome channel',
            members: [
                {
                    id: 1,
                    name: 'John Doe',
                    image: Perfil,
                },
                {
                    id: 2,
                    name: 'Jane Doe',
                    image: Perfil,
                }
            ]
        }
    ]

    const channels = [
        {
            id: 1,
            name: 'Welcome Channel',
        },
        {
            id: 2,
            name: 'General',
        },
        {
            id: 3,
            name: 'Random',
        },
    ]

    const onSearch = (value, _e, info) => console.log(info?.source, value);

    const onFinish = (values) => {
        console.log('Success:', values);
        hideModal();
    };


    const Channels = () => {
        return (
            <>
                <div className='flex flex-row items-center justify-between w-full my-3 px-2 shadow-md'>
                    <h1 className='text-white text-sm font-bold mr-auto'>Channels</h1>
                    <Image
                        alt='plus'
                        onClick={showModal}
                        src={Plus} width={20} height={20} className='cursor-pointer' />
                    <ConfigProvider
                        theme={{
                            components: {
                                Modal: {
                                    contentBg: '#120F13',
                                    headerBg: '#120F13',
                                    titleColor: '#fff',
                                },
                                Input: {
                                    colorBgContainer: '#120F13',
                                    colorBorder: '#333333',
                                    colorText: '#fff',
                                    colorTextPlaceholder: '#828282',
                                },
                            }
                        }}
                    >
                        <Modal
                            title="New Channel"
                            open={open}
                            onCancel={hideModal}
                            footer={null}
                        >
                            <Form
                                name="basic"
                                initialValues={{ remember: true }}
                                onFinish={onFinish}
                            >
                                <Form.Item
                                    name="channel"
                                    rules={[{ required: true, message: 'Please input your channel!' }]}
                                >
                                    <Input placeholder="Channel" />
                                </Form.Item>
                                <Form.Item
                                    name="description"
                                    rules={[{ required: true, message: 'Please input your description!' }]}
                                >
                                    <TextArea prefix={<AudioOutlined />} placeholder="Description" />
                                </Form.Item>
                                <Form.Item
                                    style={{ textAlign: 'end' }}
                                >
                                    <Button type="primary" htmlType="submit">
                                        Save
                                    </Button>
                                </Form.Item>
                            </Form>
                        </Modal>
                    </ConfigProvider>

                    <Image
                        onClick={handleSidebar}
                        src={Close} alt='close' width={20} height={20} className='cursor-pointer absolute top-0 right-0 m-3 lg:hidden' />
                </div>
                <div className='flex flex-col gap-4 p-4 mb-auto w-full'>
                    <Search
                        placeholder="Search channels"
                        onSearch={onSearch}
                    />
                    {
                        channels.map((channel) => (
                            <div key={channel.id} className='w-full flex flex-row items-center gap-2'>
                                <div className='w-6 h-6 rounded-md bg-[#252329] '>
                                    <p className='text-white text-sm font-bold text-center'>{channel.name.charAt(0)}</p>
                                </div>
                                <p className='text-[#BDBDBD] text-sm'>{channel.name}</p>
                            </div>
                        ))
                    }
                </div>
            </>
        )
    }

    const Channel = () => {
        return (
            <>
                <div className='flex flex-row items-center justify-between gap-2 w-full py-4 px-2 shadow-md'>
                    <Image
                        alt='back'
                        onClick={handleChannels}
                        src={BackIcon} width={20} height={20} className='cursor-pointer' />
                    <h1 className='text-white text-sm font-bold mr-auto'>All channels</h1>
                    <Image
                        alt='close'
                        onClick={handleSidebar}
                        src={Close} width={20} height={20} className='cursor-pointer absolute top-0 right-0 m-3' />
                </div>
                {
                    channel.map((channel) => (
                        <div key={channel.id} className='flex flex-col gap-2 mb-auto px-4'>
                            <h1 className='text-white text-sm font-bold'>{channel.name}</h1>
                            <p className='text-gray-400 text-xs'>{channel.description}</p>
                            <p className='text-white text-sm mb-2'>Members</p>
                            <div className='flex flex-col gap-4'>
                                {
                                    channel.members.map((member) => (
                                        <div key={member.id} className='flex flex-row items-center gap-2'>
                                            <Image src={member.image} width={30} height={30} className='rounded-md' />
                                            <p className='text-[#828282] text-xs'>{member.name}</p>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    ))
                }
            </>
        )
    }


    return (
        <>
            {
                openSidebar ? (
                    <div className='bg-[#120F13] flex flex-col justify-between items-start w-2/3 gap-2 lg:w-auto'>
                        {
                            openChannels ? (
                                <Channels />
                            ) : (
                                <Channel />
                            )
                        }
                        <div className='flex flex-col gap-2 w-full'>
                            {
                                openOptions && (
                                    <div className='bg-[#252329] w-auto h-auto flex flex-col gap-2 p-2 rounded-md ml-auto mr-1'>
                                        <div className='flex flex-row items-center gap-2 p-2 rounded-md hover:bg-[#3C393F]'>
                                            <Image alt='perfil' src={Logout} width={18} height={18} className='rounded-md' />
                                            <p className='text-[#EB5757] text-sm'>Logout</p>
                                        </div>
                                    </div>
                                )
                            }
                            <div className='w-full flex flex-row items-center gap-2 px-4 py-3 bg-[#0B090C]'>
                                <Image alt='perfil' src={Perfil} width={30} height={30} className='rounded-md' />
                                <p className='text-sm text-[#828282]'>John Doe</p>
                                <Image
                                    onClick={handleOptions}
                                    alt='open' src={Options} width={20} height={20} className='ml-auto cursor-pointer' />
                            </div>
                        </div>
                    </div>
                )
                    :
                    (
                        <Image alt='menu' src={Menu} width={20} height={20} className='cursor-pointer top-0 left-0 absolute m-4' onClick={handleSidebar} />
                    )
            }
        </>
    );
}

export default Sidebar;
