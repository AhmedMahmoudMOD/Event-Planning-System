﻿namespace Event_Planning_System.Custom
{
	public sealed record Error(string Code,string? Description= null)
	{
		public static readonly Error None = new Error(string.Empty);
	}
	public class Result
	{
		private Result(bool isSuccess, Error error)
		{
			if(isSuccess && error != Error.None || !isSuccess && error == Error.None )
			{
				throw new ArgumentException();
			}
			IsSuccess = isSuccess;
			Error = error;
		}	
		public bool IsSuccess { get; }
		public bool IsFailure => !IsSuccess;
		public Error Error { get; }

		public static Result Success() => new Result(true, Error.None);
		public static Result Failure(Error error) => new Result(false, error);

	}
}
