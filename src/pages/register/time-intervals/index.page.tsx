import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Heading, MultiStep, Text, TextInput } from '@ignite-ui/react'
import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'
import { ArrowRight } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { api } from '../../../lib/axios'
import { Container, Header } from '../styles'

import { FormError } from './styles'

const claimUsernameFormSchema = z.object({
  username: z.string().nonempty('O nome de usuário é obrigatório'),
})

type ClaimUsernameFormData = z.infer<typeof claimUsernameFormSchema>

export default function ClaimUsernameForm() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<ClaimUsernameFormData>({
    resolver: zodResolver(claimUsernameFormSchema),
  })

  const router = useRouter()

  async function handleClaimUsername(data: ClaimUsernameFormData) {
    await api.post('/users/username', {
      username: data.username,
    })

    await router.push('/register/time-intervals')
  }

  return (
    <>
      <NextSeo title="Selecione seu nome de usuário | Ignite Call" noindex />

      <Container>
        <Header>
          <Heading as="strong">Escolha um nome de usuário</Heading>
          <Text>
            Digite o nome de usuário desejado. Esse nome será usado para a URL
            do seu perfil.
          </Text>

          <MultiStep size={4} currentStep={1} />
        </Header>

        <form onSubmit={handleSubmit(handleClaimUsername)}>
          <TextInput
            size="sm"
            type="text"
            placeholder="seu-usuário"
            {...(register('username') as any)} // Usando asserção de tipo para desativar verificação de tipos
            id="username"
          />

          {errors.username && (
            <FormError size="sm">{errors.username.message}</FormError>
          )}

          <Button type="submit" disabled={isSubmitting}>
            Próximo passo
            <ArrowRight />
          </Button>
        </form>
      </Container>
    </>
  )
}
