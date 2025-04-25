import { useEffect, useState } from 'react';
import {
  Container, VStack, Text, Image, Heading, Spinner,
  Box, Button, Divider, useToast
} from '@chakra-ui/react';

export default function WhatsAppPage() {
  const [qr, setQr] = useState<string | null>(null);
  const [status, setStatus] = useState<'loading' | 'qr' | 'authenticated'>('loading');
  const [chats, setChats] = useState<any[]>([]);
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
  const [messages, setMessages] = useState<any[]>([]);

  const toast = useToast();

  useEffect(() => {
    const pollQR = async () => {
      const res = await fetch('/api/whatsapp/qr');
      const data = await res.json();

      if (data.qr) {
        setQr(data.qr);
        setStatus('qr');
      } else if (data.status === 'authenticated') {
        setStatus('authenticated');
      }

      setTimeout(pollQR, 3000);
    };

    pollQR();
  }, []);

  const loadChats = async () => {
    const res = await fetch('/api/whatsapp/chats');
    const data = await res.json();
    setChats(data.chats || []);
  };

  const selectChat = async (chatId: string) => {
    setSelectedChatId(chatId);
    const res = await fetch(`/api/whatsapp/chat/${chatId}`);
    const data = await res.json();
    setMessages(data.messages || []);
    toast({
      title: 'Conversación cargada',
      description: `Mensajes con ${chatId}`,
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Container centerContent mt={10}>
      <Heading mb={6}>WhatsApp Integration</Heading>

      {status === 'loading' && <Spinner />}
      {status === 'qr' && (
        <>
          <Text mb={2}>Escanea el código QR:</Text>
          <Image src={`https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(qr!)}&size=256x256`} alt="QR Code" />
        </>
      )}

      {status === 'authenticated' && (
        <>
          <Text fontSize="xl" color="green.400">✅ Escaneo exitoso</Text>
          <Button mt={4} onClick={loadChats} colorScheme="teal">Cargar conversaciones</Button>
        </>
      )}

      {chats.length > 0 && (
        <Box mt={8} w="100%">
          <Heading size="md" mb={2}>Conversaciones</Heading>
          <VStack spacing={3} align="start">
            {chats.map(chat => (
              <Box
                key={chat.id}
                p={3}
                borderWidth="1px"
                rounded="md"
                w="100%"
                onClick={() => selectChat(chat.id)}
                _hover={{ bg: "gray.100", cursor: "pointer" }}
              >
                <strong>{chat.name}</strong> — {chat.isGroup ? 'Grupo' : 'Individual'}
              </Box>
            ))}
          </VStack>
        </Box>
      )}

      {selectedChatId && (
        <Box mt={10} w="100%">
          <Divider my={4} />
          <Heading size="md" mb={2}>Mensajes</Heading>
          <VStack spacing={2} align="start" maxH="400px" overflowY="auto">
            {messages.map(msg => (
              <Box key={msg.id} p={2} borderWidth="1px" rounded="md" w="100%">
                <Text fontSize="sm" color="gray.600">{msg.from}</Text>
                <Text>{msg.body}</Text>
              </Box>
            ))}
          </VStack>
        </Box>
      )}
    </Container>
  );
}
