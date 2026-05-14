import { Mail, MapPin, Phone, Send } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Card } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { contactSchema, type ContactSchema } from "~/schemas/contact.schema";
import { Field, FieldGroup, FieldLabel } from "~/components/ui/field";
import { Textarea } from "~/components/ui/textarea";
import { Form, useSubmit, type ActionFunction } from "react-router";
import { api } from "~/lib/axios";
import { handleActionError } from "~/lib/utils";

export const clientAction: ActionFunction = async ({ request }) => {
  const formData = await request.formData();

  try {
    const result = await api.post(
      "/api/v1/user/contact",
      Object.fromEntries(formData)
    );

    return result.data;
  } catch (error) {
    return handleActionError(error);
  }
};

export function meta() {
  return [
    { title: "Contact - Edulearn" },
    { name: "description", content: "Contact us to get in touch with us" },
  ];
}

export default function Contact() {
  return (
    <>
      <section className="bg-linear-to-br from-primary/5 to-accent/5 px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h1 className="mb-4 text-4xl font-bold text-foreground md:text-5xl">
            Get in Touch
          </h1>
          <p className="max-w-2xl text-xl text-muted-foreground">
            Have questions? We&apos;d love to hear from you. Send us a message
            and we&apos;ll respond as soon as possible.
          </p>
        </div>
      </section>

      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 grid grid-cols-1 gap-8 lg:grid-cols-3">
            {/* Contact Info */}
            <div className="lg:col-span-1">
              <Card className="h-full p-8">
                <h3 className="mb-8 text-2xl font-bold text-foreground">
                  Contact Information
                </h3>

                <div className="space-y-8">
                  {/* Email */}
                  <div className="flex gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                      <Mail className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="mb-1 font-semibold text-foreground">
                        Email
                      </h4>
                      <a
                        href="mailto:support@edulearn.com"
                        className="text-primary hover:underline"
                      >
                        support@edulearn.com
                      </a>
                      <p className="mt-1 text-sm text-muted-foreground">
                        We&apos;ll respond within 24 hours
                      </p>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                      <Phone className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="mb-1 font-semibold text-foreground">
                        Phone
                      </h4>
                      <a
                        href="tel:+1234567890"
                        className="text-primary hover:underline"
                      >
                        +1 (234) 567-890
                      </a>
                      <p className="mt-1 text-sm text-muted-foreground">
                        Mon-Fri 9AM-6PM EST
                      </p>
                    </div>
                  </div>

                  {/* Address */}
                  <div className="flex gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                      <MapPin className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="mb-1 font-semibold text-foreground">
                        Office
                      </h4>
                      <p className="text-foreground">123 Learning Street</p>
                      <p className="text-foreground">New York, NY 10001</p>
                      <p className="text-foreground">United States</p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card className="p-8">
                <h3 className="mb-6 text-2xl font-bold text-foreground">
                  Send us a message
                </h3>

                <ContactForm />
              </Card>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function ContactForm() {
  const submit = useSubmit();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ContactSchema>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit: SubmitHandler<ContactSchema> = (data) => {
    submit(data, { method: "post" });
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FieldGroup>
        {/* Name Fields */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field>
            <FieldLabel htmlFor="contact-firstName">First name</FieldLabel>
            <Input
              id="contact-firstName"
              placeholder="John"
              {...register("firstName")}
              aria-invalid={!!errors.firstName}
            />
            {errors.firstName && (
              <p className="mt-2 text-sm text-destructive">
                {errors.firstName.message}
              </p>
            )}
          </Field>
          <Field>
            <FieldLabel htmlFor="contact-lastName">Last name</FieldLabel>
            <Input
              id="contact-lastName"
              placeholder="Doe"
              {...register("lastName")}
              aria-invalid={!!errors.lastName}
            />
            {errors.lastName && (
              <p className="mt-2 text-sm text-destructive">
                {errors.lastName.message}
              </p>
            )}
          </Field>
        </div>

        {/* Email Field */}
        <Field>
          <FieldLabel htmlFor="contact-email">Email address</FieldLabel>
          <Input
            id="contact-email"
            type="email"
            placeholder="john@example.com"
            {...register("email")}
            aria-invalid={!!errors.email}
          />
          {errors.email && (
            <p className="mt-2 text-sm text-destructive">
              {errors.email.message}
            </p>
          )}
        </Field>

        {/* Subject Field */}
        <Field>
          <FieldLabel htmlFor="contact-subject">Subject</FieldLabel>
          <Input
            id="contact-subject"
            placeholder="How can we help?"
            {...register("subject")}
            aria-invalid={!!errors.subject}
          />
          {errors.subject && (
            <p className="mt-2 text-sm text-destructive">
              {errors.subject.message}
            </p>
          )}
        </Field>

        {/* Message Field */}
        <Field>
          <FieldLabel htmlFor="contact-message">Message</FieldLabel>
          <Textarea
            id="contact-message"
            placeholder="Tell us more about your inquiry..."
            rows={6}
            {...register("message")}
            aria-invalid={!!errors.message}
          />
          {errors.message && (
            <p className="mt-2 text-sm text-destructive">
              {errors.message.message}
            </p>
          )}
        </Field>

        {/* Submit Button */}
        <Button
          type="submit"
          className="flex w-full items-center justify-center gap-2 bg-primary py-6 text-primary-foreground hover:bg-primary/90"
          disabled={isSubmitting}
        >
          <Send className="h-5 w-5" />
          {isSubmitting ? "Sending..." : "Send message"}
        </Button>
      </FieldGroup>
    </Form>
  );
}
