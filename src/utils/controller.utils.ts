import { HttpException } from "./HttpException";

export function isNull(...args: unknown[]) {
    return args.some(arg => arg == null);
}

export function isNaN(...args: unknown[]) {
    return args.some(arg => Number.isNaN(Number(arg)));
}

export function isNotAString(...args: unknown[]) {
    return args.some(arg => typeof arg !== 'string' || arg.length === 0);
}

export function isNotAFunction(...args: unknown[]) {
    return args.some(arg => typeof arg !== 'function');
}

export function isNotABoolean(...args: unknown[]) {
    return args.some(arg => typeof arg !== 'boolean');
}

export function isNotAnEmail(...args: unknown[]) {
    return args.some(
        arg =>
            !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
                arg as string,
            ),
    );
}

export function throwIfNull(args: unknown, reason: string) {
    if (isNull(args)) {
        throw new HttpException(400, reason || 'Invalid parameter : expected not null');
    }
}

export function throwIfNotNumber(args: unknown[], reason?: string) {
    if (isNaN(args) || isNull(args)) {
        throw new HttpException(400, reason || 'Invalid parameter : expected number');
    }
}

export function throwIfNotString(args: string, reason?: string) {
    if (isNotAString(args) || isNull(args)) {
        throw new HttpException(400, reason || 'Invalid parameter : expected string');
    }
}

export function throwIfNotEmail(args: string, reason?: string) {
    if (isNotAnEmail(args) || isNull(args)) {
        throw new HttpException(400, reason || 'Invalid parameter : expected email');
    }
}

export function throwIfNotBoolean(args: boolean, reason?: string) {
    if (isNotABoolean(args) || isNull(args)) {
        throw new HttpException(400, reason || 'Invalid parameter : expected boolean');
    }
}
