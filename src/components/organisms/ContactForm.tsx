import { useState } from 'react'
import type { ChangeEvent, FormEvent } from 'react'
import Button from '../atoms/Button'
import Input from '../atoms/Input'
import Textarea from '../atoms/Textarea'
import Title from '../atoms/Title'
import FormField from '../molecules/FormField'
import FormMessage from '../molecules/FormMessage'
import type { ContactFormData } from '../../types/contact'
import '../../styles/components/organisms/contactForm.css'

type ContactFormErrors = Partial<Record<keyof ContactFormData, string>>
type FormStatus = 'idle' | 'success' | 'error'

const emptyValues: ContactFormData = {
  nombre: '',
  correo: '',
  asunto: '',
  mensaje: '',
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validate(values: ContactFormData): ContactFormErrors {
  const errors: ContactFormErrors = {}

  if (values.nombre === '') {
    errors.nombre = 'El nombre es obligatorio.'
  }

  if (values.correo === '') {
    errors.correo = 'El correo electrónico es obligatorio.'
  } else if (!emailPattern.test(values.correo)) {
    errors.correo = 'Ingresa un correo electrónico válido.'
  }

  if (values.asunto === '') {
    errors.asunto = 'El asunto es obligatorio.'
  }

  if (values.mensaje === '') {
    errors.mensaje = 'El mensaje es obligatorio.'
  }

  return errors
}

interface ContactFormProps {
  title?: string
  onSubmit?: (data: ContactFormData) => void
}

function ContactForm({
  title = 'Envíanos un mensaje',
  onSubmit,
}: ContactFormProps) {
  const [values, setValues] = useState<ContactFormData>(emptyValues)
  const [errors, setErrors] = useState<ContactFormErrors>({})
  const [status, setStatus] = useState<FormStatus>('idle')

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const field = event.target.name as keyof ContactFormData
    setValues((previous) => ({ ...previous, [field]: event.target.value }))
    setStatus('idle')
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const cleaned: ContactFormData = {
      nombre: values.nombre.trim(),
      correo: values.correo.trim(),
      asunto: values.asunto.trim(),
      mensaje: values.mensaje.trim(),
    }

    const newErrors = validate(cleaned)
    setErrors(newErrors)

    if (Object.keys(newErrors).length > 0) {
      setStatus('error')
      return
    }

    onSubmit?.(cleaned)
    setValues(emptyValues)
    setStatus('success')
  }

  const fieldProps = (name: keyof ContactFormData) => ({
    id: `contact-${name}`,
    name,
    value: values[name],
    onChange: handleChange,
    hasError: Boolean(errors[name]),
    'aria-invalid': Boolean(errors[name]),
    'aria-describedby': errors[name] ? `contact-${name}-error` : undefined,
  })

  return (
    <form className="contactForm" noValidate onSubmit={handleSubmit}>
      <Title level={2}>{title}</Title>

      <div className="contactForm__fields">
        <FormField id="contact-nombre" label="Nombre" error={errors.nombre}>
          <Input {...fieldProps('nombre')} placeholder="Tu nombre" />
        </FormField>

        <FormField
          id="contact-correo"
          label="Correo electrónico"
          error={errors.correo}
        >
          <Input
            {...fieldProps('correo')}
            type="email"
            placeholder="tu@email.com"
          />
        </FormField>

        <FormField id="contact-asunto" label="Asunto" error={errors.asunto}>
          <Input {...fieldProps('asunto')} placeholder="Asunto del mensaje" />
        </FormField>

        <FormField id="contact-mensaje" label="Mensaje" error={errors.mensaje}>
          <Textarea
            {...fieldProps('mensaje')}
            rows={7}
            placeholder="Escribe tu mensaje..."
          />
        </FormField>
      </div>

      <Button type="submit" variant="pink" fullWidth>
        Enviar mensaje
      </Button>

      {status === 'error' && (
        <FormMessage type="error">Revisa los campos indicados.</FormMessage>
      )}
      {status === 'success' && (
        <FormMessage type="success">Mensaje enviado correctamente.</FormMessage>
      )}
    </form>
  )
}

export default ContactForm
