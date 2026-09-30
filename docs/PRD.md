# Product Requirements Document

## Overview

ResolveAI is a portfolio MVP that turns a support issue into a concrete, source-visible resolution using retrieval-augmented generation (RAG).

## Problem and users

Support agents and technical users need procedures that are grounded in existing knowledge, not generic chatbot answers. The target user is a customer-support or developer-support team member handling authentication, payments, billing, security, and API issues.

## Solution and flow

1. User describes an issue.
2. The server validates it and retrieves semantically similar documents.
3. Gemini receives the issue plus delimited retrieved context.
4. The UI shows a structured resolution and the retrieved documents.

## Goals

Working full-stack RAG, real pgvector retrieval, server-side AI calls, useful seed data, and a polished mobile-friendly interface. Success means the supplied payment, password, API, and subscription cases retrieve relevant sources and produce actionable responses.

## Requirements

The API accepts a 10–2,000 character issue, returns validated structured fields, never fabricates sources, and suggests escalation when retrieval is insufficient. The UI offers examples, loading stages, source cards, and accessible controls.

## Non-goals and constraints

This MVP has no authentication, upload pipeline, chat history, analytics, streaming, or claims of model accuracy. It uses one Next.js application, Gemini APIs, and an existing Supabase schema/RPC. Future work: accounts, document ingestion/chunking, evaluation datasets, feedback, observability, and tenant isolation.
