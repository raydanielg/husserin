<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class TeamInvitation extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(
        public string $name,
        public string $email,
        public string $role,
        public string $setupUrl,
    ) {}

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: "You're invited to join Husserin Investment Company",
        );
    }

    public function content(): Content
    {
        return new Content(
            markdown: 'emails.team-invitation',
        );
    }

    public function attachments(): array
    {
        return [];
    }
}
