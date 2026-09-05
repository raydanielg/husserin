<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Attachment;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class ContactSubmission extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(
        public array $data,
        public string $enquiryId,
    ) {}

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: "Contact Message — {$this->enquiryId}",
        );
    }

    public function content(): Content
    {
        return new Content(
            markdown: 'emails.contact-submission',
        );
    }

    public function attachments(): array
    {
        return [];
    }
}
