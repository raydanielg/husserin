<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Attachment;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class RfqSubmission extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(
        public array $data,
        public string $enquiryId,
    ) {}

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: "RFQ Submission — {$this->enquiryId}",
        );
    }

    public function content(): Content
    {
        return new Content(
            markdown: 'emails.rfq-submission',
        );
    }

    public function attachments(): array
    {
        return [];
    }
}
